import { auth } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import prisma from "@workspace/db/client";
import { error } from "console";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({
        error: "Unauthorised",
        status: 401,
      });
    }

    const userId = session.user.id;

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    const collectionsLinks = await prisma.collections.findMany({
      where: {
        userId: userId,
        slug: slug || "",
      },
      include: {
        links: {
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
        },
      },
    });

    const links = collectionsLinks.map((link) => link.links);

    return NextResponse.json({
      links,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      error: "Failed",
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
        error: "Unauthorised",
        status: 401,
      });
    }

    const userId = session.user.id;

    const { collectionName } = await req.json();

    const slug = slugify(collectionName);

    const name =
      collectionName.charAt(0).toUpperCase() + collectionName.slice(1);

    const existingCollection = await prisma.collections.findFirst({
      where: {
        slug: slug,
        userId: userId,
      },
    });

    if (existingCollection) {
      return NextResponse.json({
        status: 404,
        error: "Collection Name already exists",
      });
    }

    const newCollection = await prisma.collections.create({
      data: {
        name: name,
        slug: slug,
        userId: userId,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Collection created",
      collectionName: newCollection,
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server error",
      error: err,
    });
  }
}
