import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import faker from 'faker'

const typeDefs = `
  type Book {
    id: ID!
    title: String
    author: String
    likes: Int!
  }

  type Query {
    books(limit: Int, offset: Int): [Book!]
  }
`

const books = [...Array(10).keys()].map(_ => ({
  id: faker.random.uuid(),
  title: faker.commerce.productName(),
  author: `${faker.name.firstName()} ${faker.name.lastName()}`,
  likes: faker.random.number()
}))

const resolvers = {
  Query: {
    books: (parent, { limit, offset }) => books.slice(offset || 0, limit || books.length)
  }
}

const app = express();
const endpoint = '/graphql';
const server = new ApolloServer({ typeDefs, resolvers, playground: { endpoint } });
server.applyMiddleware({ app, path: endpoint });

app.listen(3213, () => console.log(`server ready at http://localhost:3213${endpoint} `));
