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
    // const item = await context.db.query.item(
    //   {
    //     where: { id }
    //   },
    //   `{ id title }`
    // );
    const item = await context.db.mutation.deleteItem(
      {
        where: { id }
      },
      info
    );
    return item;
  }
};

export default Mutation;
