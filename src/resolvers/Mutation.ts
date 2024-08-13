import { Post } from "@prisma/client";
import { Context } from "..";

interface PostArgs {
  post: {
    title: string;
    content: string;
  };
}

interface PostPayloadType {
  userErrors: {
    message: string;
  }[];
  post: Post | null;
}

export const Mutation = {
  postCreate: async (
    _: any,
    { post }: PostArgs,
    { prisma }: Context
  ): Promise<PostPayloadType | null> => {
    const { title, content } = post;
    console.log(title, content);

    if (!title || !content) {
      return {
        userErrors: [
          {
            message: "You must provide title and content to create a post.",
          },
        ],
        post: null,
      };
    }

    return {
      userErrors: [],
      post: await prisma.post.create({
        data: {
          title,
          content,
          authorId: 2,
        },
      }),
    };
  },

  postUpdate: async (
    _: any,
    { postId, post }: { postId: string; post: PostArgs["post"] },
    { prisma }: Context
  ): Promise<PostPayloadType | null> => {
    const { title, content } = post;

    if (!title && !content) {
      return {
        userErrors: [
          {
            message: "Need to have atleast one field to update",
          },
        ],
        post: null,
      };
    }
    const isPostExist = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });
    if (!isPostExist) {
      return {
        userErrors: [
          {
            message: "Post does not exist",
          },
        ],
        post: null,
      };
    }

    let payloadToUpdate = {
      title,
      content,
    };
    if (!title) delete (payloadToUpdate as any).title;
    if (!content) delete (payloadToUpdate as any).content;
    return {
      userErrors: [],
      post: await prisma.post.update({
        data: {
          ...payloadToUpdate,
        },
        where: {
          id: Number(postId),
        },
      }),
    };
  },
  postDelete: async (
    _: any,
    { postId }: { postId: string },
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!post) {
      return {
        userErrors: [
          {
            message: "Post does not exist",
          },
        ],
        post: null,
      };
    }
    await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });
    return {
      userErrors: [],
      post,
    };
  },
};
