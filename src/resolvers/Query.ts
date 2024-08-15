import { Context } from "..";
import { Post, User } from "@prisma/client";

export const Query = {
  posts: async (
    _: any,
    __: any,
    { prisma }: Context
  ): Promise<Post[] | null> => {
    return prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
  me: async (
    _: any,
    __: any,
    { prisma, userInfo }: Context
  ): Promise<User | null> => {
    if (!userInfo) return null;

    return prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },
  profile: async (
    _: any,
    { userId }: { userId: string },
    { prisma }: Context
  ) => {
    return prisma.profile.findUnique({
      where: {
        userId: Number(userId),
      },
      include: {
        user: true,
      },
    });
  },
};
