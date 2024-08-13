import { Context } from "..";
import { Post } from "@prisma/client";

export const Query = {
  posts: async (
    _: any,
    __: any,
    { prisma }: Context
  ): Promise<Post[] | null> => {
    return prisma.post.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
};
