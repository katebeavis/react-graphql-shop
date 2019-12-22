import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { Request } from 'express';
const jwt = require('jsonwebtoken');

interface UserAuthRequest extends Request {
  userId: string;
}

import createServer from './createServer';

dotenv.config();

const server = createServer();

server.express.use(cookieParser());
server.express.use((req: UserAuthRequest, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
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
