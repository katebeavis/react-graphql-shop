import formatCurrency from '../../lib/formatCurrency';
import { SCartItem } from './CartItem.style';
import RemoveItemFromCart from '../RemoveItemFromCart/RemoveItemFromCart';

interface CartItemProps {
  id: string;
  quantity: number;
  item: Item;
}

interface Item {
  id: string;
  price: number;
  image: string;
  title: string;
  description: string;
}

const CartItem = ({ id, quantity, item }: CartItemProps) => {
  const { price, image, title } = item;
  return (
    <SCartItem>
      <img width='100px' src={image} alt={title} />
      <>
        <h3>
          {title} - {id}
        </h3>
        <p>
          {formatCurrency({ amount: price * quantity })}
          {' - '}
          <em>
            {quantity} &times; {formatCurrency({ amount: price })}
          </em>
        </p>
      </>
      <RemoveItemFromCart id={id} />
    </SCartItem>
  );
};

export default CartItem;
