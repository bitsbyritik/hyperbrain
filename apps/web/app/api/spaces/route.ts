import { auth } from "@/lib/auth";
import prisma from "@workspace/db/client";
import { spaceSchema } from "@workspace/schema/zod";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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

    const parsedData = spaceSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({
        error: "Data validation failed!",
        status: 400,
      });
    }

    const { spaceName, spaceHandle, spaceImg, spaceDescription, isPublic } =
      parsedData.data;

    const newSpace = await prisma.space.create({
      data: {
        name: spaceName,
        handle: spaceHandle,
        image: spaceImg || "",
        description: spaceDescription || "",
        visibility: isPublic ? "PUBLIC" : "PRIVATE",
        ownerId: userId,
      },
    });

    return NextResponse.json({
      message: "successfully created",
      status: 200,
      newSpace: newSpace,
    });
  } catch (err) {
    console.log(err);
  }
}
