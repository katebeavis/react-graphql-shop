import { useQuery, useMutation } from 'react-apollo';

import { CartStyles, Supreme } from './Cart.style';
import { Button, CloseButton } from '../../shared/shared.style';
import { LOCAL_STATE_QUERY } from '../../queries/queries';
import { TOGGLE_CART_MUTATION } from '../../mutations/mutations';
import Error from '../Error/Error';
import useUser from '../../customHooks/useUser';
import CartItem from '../CartItem/CartItem';
import calcTotalPrice from '../../lib/calcTotalPrice';
import formatCurrency from '../../lib/formatCurrency';
import { ICartItem } from '../../shared/types';

const Cart = () => {
  const { loading, error, data } = useQuery(LOCAL_STATE_QUERY);
  const { loading: userLoading, error: userError, data: userData } = useUser();
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);

  if (loading || userLoading) return null;

  if (error) return <Error error={error} />;

  if (userError) return <Error error={userError} />;

  const { cartOpen } = data;

  const { userDetails } = userData;

  if (!userDetails) return null;

  const { name, cart } = userDetails;

  const totalPrice = calcTotalPrice(cart);

  return (
    <CartStyles open={cartOpen}>
      <header>
        <CloseButton onClick={() => toggleCart()} title='close'>
          &times;
        </CloseButton>
        <Supreme>{name}'s cart</Supreme>
        <p>
          You have {cart.length} item{cart.length > 1 ? 's' : ''} in your cart
        </p>
      </header>
      <ul>
        {cart.map((cartItem: ICartItem) => (
          <CartItem
            key={cartItem.id}
            id={cartItem.id}
            quantity={cartItem.quantity}
            item={cartItem.item}
          />
        ))}
      </ul>
      <footer>
        <p>{formatCurrency({ amount: totalPrice })}</p>
        <Button>Checkout</Button>
      </footer>
    </CartStyles>
  );
};

export default Cart;
