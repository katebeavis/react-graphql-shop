import { ICartItem } from '../shared/types';

const calcTotalPrice = (cart: any) => {
  return cart.reduce((tally: number, cartItem: ICartItem) => {
    if (!cartItem.item) return tally;
    return tally + cartItem.quantity * cartItem.item.price;
  }, 0);
};

export default calcTotalPrice;
