# Node.js GraphQL Prisma Project

This project is an experimental setup integrating Node.js with GraphQL, Prisma ORM, and PostgreSQL. It is designed to explore the capabilities and interactions of these technologies within a single application.

## Project Structure

The project is organized as follows:

```plaintext
├── prisma
│   └── schema.prisma              # Prisma schema for database models
├── src
│   ├── loaders
│   │   └── userLoaders.ts         # DataLoader utility for batching and caching user queries
│   ├── resolvers
│   │   ├── Mutation
│   │   │   ├── auth.ts            # Authentication-related mutations
│   │   │   └── post.ts            # Post-related mutations
│   │   ├── Post.ts                # Resolver for Post type
│   │   ├── User.ts                # Resolver for User type
│   │   └── Query.ts               # Resolver for Query type
│   ├── utils
│   │   ├── canUserMutatePost.ts   # Utility to check if the user can mutate a post
│   │   └── getUserFromToken.ts    # Utility to get user information from JWT token
│   └── index.ts                   # Main entry point of the application
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── src/schema.ts                  # GraphQL schema definitions
```

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **GraphQL**: API query language for handling data.
- **Prisma ORM**: Database toolkit and query engine for working with PostgreSQL.
- **PostgreSQL**: Relational database for data storage.

## Setup Instructions

### Prerequisites

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later)
- [npm](https://www.npmjs.com/) (Node package manager)
- PostgreSQL database setup.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sandip-Rocks/blog-app.git
   cd blog-app
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up the PostgreSQL database and update the `DATABASE_URL` in the `.env` file with your database credentials.

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

### Running the Server

To start the GraphQL server, run:

```bash
npm start
```

The server will be available at `http://localhost:4000`.

### Available Queries and Mutations

#### Queries

- `posts`: Retrieve all posts.
- `me`: Get the authenticated user's information.
- `profile(userId: ID!)`: Get the profile of a specific user.

#### Mutations

- `postCreate(post: PostInput!)`: Create a new post.
- `postUpdate(postId: ID!, post: PostInput!)`: Update an existing post.
- `postDelete(postId: ID!)`: Delete a post.
- `postPublish(postId: ID!)`: Publish a post.
- `postUnpublish(postId: ID!)`: Unpublish a post.
- `signup(credentials: CredentialsInput!, name: String!, bio: String!)`: Sign up a new user.
- `signin(credentials: CredentialsInput!)`: Sign in a user.

## Additional Notes

- The project is designed to experiment with the features and capabilities of GraphQL and Prisma, and as such, some functionalities may not be fully optimized for production use.
- The Prisma schema defines the data models and their relationships, which are mapped to the PostgreSQL database.

## License

This project is licensed under the MIT License.