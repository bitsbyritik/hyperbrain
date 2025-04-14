"use server";

import prisma from "@workspace/db/client";

export async function checkSpaceHandle({
  spaceHandle,
}: {
  spaceHandle: string;
}) {
  const existingHandle = await prisma.space.findUnique({
    where: {
      handle: spaceHandle,
    },
  });

  if (existingHandle) {
    return true;
  }

  return false;
}
