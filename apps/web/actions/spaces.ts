"use server";

import prisma from "@workspace/db/client";
import { authSession } from "./session";

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

export async function getSpaceDetails({
  spaceHandle,
}: {
  spaceHandle: string;
}) {
  const spaceDetails = await prisma.space.findFirst({
    where: {
      handle: spaceHandle,
    },
    select: {
      id: true,
      name: true,
      handle: true,
      image: true,
      description: true,
      visibility: true,
      createdAt: true,
    },
  });

  if (spaceDetails) {
    return { spaceDetails };
  }
}
