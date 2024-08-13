import { gql } from "apollo-server";

export const typeDefs = gql`
    type Query {
        posts: [Post!]!
    }

    type Mutation {
        postCreate(post: PostInput!): PostPayload!
        postUpdate(postId:ID!, post: PostInput!): PostPayload!
        postDelete(postId: ID!): PostPayload!
    }

    type Post {
        id: ID!
        title: String
        content: String
        published: Boolean
        user: User!
    }

    type User {
        id: ID!
        email: String!
        name: String!
        posts: [Post!]!
        profile: Profile!
    }

    type Profile {
        id: ID!
        bio: String!
        user: User!
    }

    type UserError {
        message: String!
    }

    type PostPayload {
        userErrors: [UserError!]!
        post: Post
    }

    input PostInput {
        title: String
        content: String
    }
`;
