import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { Request } from 'express';

import db from './db';

const jwt = require('jsonwebtoken');

interface UserAuthRequest extends Request {
  userId: string;
  user: User;
}

interface User {
  id: string;
  permissions: string[];
  email: string;
  name: string;
}

import createServer from './createServer';

dotenv.config();

const server = createServer();

server.express.use(cookieParser());
// TODO refactor into auth helper
server.express.use((req: UserAuthRequest, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});
// TODO refactor into auth helper
server.express.use(async (req: UserAuthRequest, res, next) => {
  if (!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    `{ id, permissions, email, name }`
  );
  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: [process.env.APP_URL, process.env.PLAYGROUND_URL]
    }
  },
  server => {
    console.log(`Server is running on port ${server.port}`);
  }
);
