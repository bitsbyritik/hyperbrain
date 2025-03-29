import { auth } from "@/lib/auth";
import prisma from "@workspace/db/client";
import { error } from "console";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
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

    const collections = await prisma.collections.findMany({
      where: {
        ownerId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ collections });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch collections" },
      { status: 500 },
    );
  }
}
