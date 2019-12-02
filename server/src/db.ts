require('dotenv').config();
import { Prisma } from 'prisma-binding';

const db = new Prisma({
  typeDefs: __dirname + '/generated/prisma-client/prisma.graphql',
  endpoint: 'https://eu1.prisma.sh/kate-beavis-fb4ff8/react-graphql/dev',
  secret: process.env.PRISMA_SECRET,
  debug: false
});

export default db;
