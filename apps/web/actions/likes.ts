"use server";

import prisma from "@workspace/db/client";
import { authSession } from "./session";

export async function handleLike({ linkId }: { linkId: string }) {
  const { session } = await authSession();
  const userId = session?.user.id;

  if (!userId) {
    return "Unauthorised";
  }

  const existingLike = await prisma.likedLinks.findFirst({
    where: {
      userId: userId,
      linkId: linkId,
    },
  });

  if (existingLike) {
    await prisma.likedLinks.delete({
      where: {
        id: existingLike.id,
      },
    });

    return "Unliked";
  }

  await prisma.likedLinks.create({
    data: {
      userId: userId,
      linkId: linkId,
    },
  });

  return "Liked";
}
