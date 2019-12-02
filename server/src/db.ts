import * as dotenv from 'dotenv';
import { Prisma } from 'prisma-binding';

dotenv.config();

const db = new Prisma({
  typeDefs: __dirname + '/generated/prisma-client/prisma.graphql',
  endpoint: process.env.PRISMA_URL,
  secret: process.env.PRISMA_SECRET,
  debug: false
});

export default db;
