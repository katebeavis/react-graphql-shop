import { GraphQLServer } from 'graphql-yoga';

import Query from './query';
import Mutation from './mutation';
import db from './db';

const createServer = () => {
  return new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers: { Query, Mutation },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });
};

export default createServer;
