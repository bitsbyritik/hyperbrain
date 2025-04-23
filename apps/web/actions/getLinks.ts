import prisma from "@workspace/db/client";
import { authSession } from "./session";
import { slugify } from "@/lib/slugify";

export const getMyLinks = async () => {
  const { session } = await authSession();

  const userId = session?.user.id;

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

  return { links };
};

export const getAllBookmarkLinks = async () => {
  const { session } = await authSession();

  const userId = session?.user.id;

  const bookmarkLinks = await prisma.bookmarks.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      link: {
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

  const links = bookmarkLinks.map((link) => link.link);

  return { links };
};

export const getAllLikedLinks = async () => {
  const { session } = await authSession();

  const userId = session?.user.id;

  const likedLinks = await prisma.likedLinks.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      link: {
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

  const links = likedLinks.map((link) => link.link);

  return { links };
};

export const getCollectionLinks = async ({
  collectionName,
}: {
  collectionName: string;
}) => {
  const { session } = await authSession();

  const userId = session?.user.id;

  const slug = slugify(collectionName);

  const collectionsLinks = await prisma.collections.findMany({
    where: {
      userId: userId,
      slug: slug,
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
  return { links };
};
