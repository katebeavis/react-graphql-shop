require('dotenv').config();
import createServer from './createServer';
// import db from './db';

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
