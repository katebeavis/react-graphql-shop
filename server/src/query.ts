import { forwardTo } from 'prisma-binding';
import hasPermission from './helper';

interface Context {
  db: any;
  request: any;
}

// TODO error handling
const Query = {
  // if there is no logic needed, the query can be forwarded
  items: forwardTo('db'),
  // otherwise the query needs to be written out
  async item(parent: any, args: any, context: Context, info: any) {
    const { id } = args.where;
    const item = await context.db.query.item({ where: { id } });
    return item;
  },
  itemsConnection: forwardTo('db'),
  async userDetails(parent: any, args: any, context: Context, info: any) {
    const { userId } = context.request;
    if (!userId) return null;
    const user = await context.db.query.user({ where: { id: userId } }, info);
    return user;
  },
  async users(parent: any, args: any, context: Context, info: any) {
    const { user, userId } = context.request;
    if (!userId) {
      throw new Error("You don't have the permissions to do that");
    }
    hasPermission(user.permissions, ['ADMIN', 'PERMISSION_UPDATE']);
    return context.db.users({}, info);
  }
};

export default Query;
