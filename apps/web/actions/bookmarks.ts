"use server";

import prisma from "@workspace/db/client";
import { authSession } from "./session";

export async function getBookmarklist() {
  const { session } = await authSession();

  const bookmarklist = await prisma.bookmarks.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      link: true,
    },
  });

  console.log(bookmarklist);

  return { bookmarklist };
}

export async function handleBookmark({ linkId }: { linkId: string }) {
  const { session } = await authSession();
  const userId = session?.user.id;

  if (!userId) {
    return "Unauthorised";
  }

  const existingBookmark = await prisma.bookmarks.findFirst({
    where: {
      userId: userId,
      linkId: linkId,
    },
  });

  if (existingBookmark) {
    await prisma.bookmarks.delete({
      where: {
        id: existingBookmark.id,
      },
    });

    return "Bookmark removed";
  }

  await prisma.bookmarks.create({
    data: {
      userId: userId,
      linkId: linkId,
    },
  });

  return "Bookmark added";
}
