import fs from 'fs'
import path from 'path'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import faker from 'faker'
import * as G from '../generated-types/server/graphql-resolver-types'

const schema = fs.readFileSync(path.resolve(__dirname, '../graphql/schema.gql'))
const typeDefs = gql`
  ${schema}
`

const mybooks = [...Array(10).keys()].map(_ => ({
  id: faker.random.uuid(),
  title: faker.commerce.productName(),
  author: `${faker.name.firstName()} ${faker.name.lastName()}`,
  likes: 0
}))

const books: G.QueryResolvers['books'] = (_parent, arg, _context, _info) => {
  const { limit, offset } = arg

  return mybooks.slice(offset || 0, limit || mybooks.length)
}

const likeIt: G.MutationResolvers['likeIt'] = (_parent, arg, _context, _info) => {
  const { id } = arg
  const idx = mybooks.findIndex(book => book.id === id)

  if (idx > -1) {
    mybooks[idx].likes += 1
    return mybooks[idx]
  } else {
    return null
  }
}

const resolvers: G.Resolvers = {
  Query: { books },
  Mutation: { likeIt }
}

const app = express();
const endpoint = '/graphql';
const server = new ApolloServer({ typeDefs, resolvers, playground: { endpoint } });
server.applyMiddleware({ app, path: endpoint });

app.listen(3213, () => console.log(`server ready at http://localhost:3213${endpoint} `));
