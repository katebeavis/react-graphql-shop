import { forwardTo } from 'prisma-binding';

interface Context {
  db: any;
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
  itemsConnection: forwardTo('db')
};

export default Query;
