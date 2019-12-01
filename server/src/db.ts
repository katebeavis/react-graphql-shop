import { Prisma } from 'prisma-binding';
import dotenv from 'dotenv';

dotenv.config();

const db = new Prisma({
  typeDefs: '../generated/prisma-client/prisma-schema.ts',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false
});

export default db;
