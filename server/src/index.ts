import * as dotenv from 'dotenv';
import createServer from './createServer';

dotenv.config();

const server = createServer();

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
