"use server";

import prisma from "@workspace/db/client";
import { authSession } from "./session";

export async function getAllCollectionName() {
  const { session } = await authSession();

  const userId = session?.user.id;

  const collectionList = await prisma.collections.findMany({
    where: {
      userId: userId,
    },
    select: {
      name: true,
    },
  });

  return { collectionList };
}
