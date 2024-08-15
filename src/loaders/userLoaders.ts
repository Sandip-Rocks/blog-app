import { prisma } from "..";
import DataLoader from "dataloader";
import { User } from "@prisma/client";

type BatchUser = (id: number[]) => Promise<User[]>;

const batchUser: BatchUser = async (ids) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  const userMap: { [key: string]: User } = {};

  users.forEach((user) => {
    userMap[user.id] = user;
  });

  return ids.map(id => userMap[id]);
};

//@ts-ignore
export const userLoader = new DataLoader<number, User>(batchUser);