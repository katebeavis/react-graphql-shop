interface Context {
  db: any;
}

const Mutation = {
  async createItem(parent: any, args: any, context: Context, info: any) {
    const item = await context.db.mutation.createItem(
      {
        data: { ...args }
      },
      info
    );
    return item;
  }
};

export default Mutation;
