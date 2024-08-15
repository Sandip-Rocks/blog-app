import { Context } from "..";
import { userLoader } from "../loaders/userLoaders";

interface PostParentType {
  authorId: number;
  bio: string;
  userId: number;
}

export const Post = {
  user: (parent: PostParentType, __: any, ___: Context) => {
    return userLoader.load(parent.authorId);
  },
};
