import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

import createServer from './createServer';

dotenv.config();

const server = createServer();

server.express.use(cookieParser());

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
