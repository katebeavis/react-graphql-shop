interface Context {
  db: any;
}

const Query = {
  async items(parent: any, args: any, context: Context, info: any) {
    const items = await context.db.query.items();
    return items;
  }
};

export default Query;
