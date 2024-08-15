import { ApolloServer, gql } from "apollo-server";
import { Mutation, Post, Query, User } from "./resolvers";
import { typeDefs } from "./schema";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { getUserFromToken } from "./utils/getUserFromToken";

export const prisma = new PrismaClient();

export interface Context {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
    userInfo: {
      userId: number
    } | null;
}

const resolvers = {
  Query,
  Mutation,
  Post,
  User,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: any):Promise<Context> => {
    const userInfo = await getUserFromToken(req.headers.authorization)
    return {
      prisma,
      userInfo,
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
