import { auth } from "@/lib/auth";
import prisma from "@workspace/db/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { linkSchema } from "@workspace/schema/zod";
import { fetchMetadata } from "../_utils/fetchMetadata";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({
        error: "Unauthorized",
        status: 401,
      });
    }

    const userId = session.user.id;

    const links = await prisma.links.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        bookmark: {
          where: {
            userId: userId,
          },
          select: {
            linkId: true,
          },
        },
        like: {
          where: {
            userId: userId,
          },
          select: {
            linkId: true,
          },
        },
      },
    });

    return NextResponse.json({
      links,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      error: "Failed getting links",
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({
        error: "Unauthorized",
        status: 401,
      });
    }

    const userId = session.user.id;

    const body = await req.json();

    const parsedData = linkSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({
        error: "Data validation failed!",
        status: 400,
      });
    }

    const { url, thoughts, collectionId, spaceId } = parsedData.data;

    const newLink = await prisma.links.create({
      data: {
        userId: userId,
        url: url,
        thoughts: thoughts,
        collectionId: collectionId,
        spaceId: spaceId,
      },
    });

    const metaData = await fetchMetadata(url);

    if (metaData) {
      await prisma.links.update({
        where: {
          userId: userId,
          id: newLink.id,
        },
        data: {
          metadata: metaData,
        },
      });
    }

    return NextResponse.json({
      message: "successfully created",
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      error: "Failed to create the link",
      status: 500,
    });
  }
}
