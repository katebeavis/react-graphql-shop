import * as dotenv from 'dotenv';
import { transport, emailTemplate } from '../src/mail';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');

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
          permissions: {
            set: [USER]
          }
        }
      },
      info
    );
    const userId = user.id;
    // TODO refactor into auth helper
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
      throw new Error(`No user with email ${email}`);
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
  },
  async requestResetToken(parent: any, args: any, context: Context, info: any) {
    const { email } = args;
    const user = await context.db.query.user({
      where: {
        email
      }
    });
    if (!user) {
      throw new Error(`No user with email ${email}`);
    }
    const resetToken = await randomBytes(20).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000;
    await context.db.mutation.updateUser({
      where: { email },
      data: { resetToken, resetTokenExpiry }
    });
    try {
      await transport.sendMail({
        from: 'anEmail@email.com',
        to: user.email,
        subject: 'Reset password',
        html: emailTemplate(
          `Reset your passsord by clicking  \n\n <a href="${process.env.APP_URL}/reset?resetToken=${resetToken}">here</a>`
        )
      });
      return { message: 'success' };
    } catch (error) {
      // TODO how to deal with error
      throw new Error(`Error requesting password reset ${error}`);
    }
  },
  async resetPassword(parent: any, args: any, context: Context, info: any) {
    const { resetToken, password, confirmPassword } = args;
    if (password !== confirmPassword) {
      throw new Error(`Passwords do not match`);
    }
    const [user] = await context.db.query.users({
      where: {
        resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      }
    });
    if (!user) {
      throw new Error(`Token is invalid or expired`);
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const { email } = user;
    const updatedUser = await context.db.mutation.updateUser({
      where: { email },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });
    const userId = updatedUser.id;
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
    return updatedUser;
  }
};

export default Mutation;
