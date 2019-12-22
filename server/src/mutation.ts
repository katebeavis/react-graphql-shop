import * as dotenv from 'dotenv';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();

const SALT_ROUNDS = 10;
const USER = 'USER';

// TODO get db type from prisma
interface Context {
  db: any;
  response: any;
}

// TODO add types
const Mutation = {
  async createItem(parent: any, args: any, context: Context, info: any) {
    const item = await context.db.mutation.createItem(
      {
        data: { ...args }
      },
      info
    );
    return item;
  },
  async updateItem(parent: any, args: any, context: Context, info: any) {
    const { id, ...updates } = args;
    const item = await context.db.mutation.updateItem(
      {
        data: { ...updates },
        where: { id }
      },
      info
    );
    return item;
  },
  async deleteItem(parent: any, args: any, context: Context, info: any) {
    const { id } = args;
    const item = await context.db.mutation.deleteItem(
      {
        where: { id }
      },
      info
    );
    return item;
  },
  async signUp(parent: any, args: any, context: Context, info: any) {
    const { name, email, password } = args;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await context.db.mutation.createUser(
      {
        data: {
          name,
          email: email.toLowerCase(),
          password: hashedPassword,
          permissions: { set: [USER] }
        }
      },
      info
    );
    const userId = user.id;
    const token = jwt.sign(
      {
        userId
      },
      process.env.APP_SECRET
    );
    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    return user;
  },
  async signIn(parent: any, args: any, context: Context, info: any) {
    const { email, password } = args;
    const user = await context.db.query.user({
      where: {
        email
      }
    });
    if (!user) {
      throw new Error(`No user with that email`);
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }
    const userId = user.id;
    const token = jwt.sign(
      {
        userId
      },
      process.env.APP_SECRET
    );
    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    return user;
  },
  async signOut(parent: any, args: any, context: Context, info: any) {
    context.response.clearCookie('token');
    return { message: 'Signed out' };
  }
};

export default Mutation;
