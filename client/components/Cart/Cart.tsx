import { useQuery, useMutation } from 'react-apollo';

import { CartStyles, Supreme } from './Cart.style';
import { Button, CloseButton } from '../../shared/shared.style';
import { LOCAL_STATE_QUERY } from '../../queries/queries';
import { TOGGLE_CART_MUTATION } from '../../mutations/mutations';
import Error from '../Error/Error';

const Cart = () => {
  const { loading, error, data } = useQuery(LOCAL_STATE_QUERY);
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);

  if (loading) return <p>Loading....</p>;
  if (error) return <Error error={error} />;

  const { cartOpen } = data;

  return (
    <CartStyles open={cartOpen}>
      <header>
        <CloseButton onClick={() => toggleCart()} title='close'>
          &times;
        </CloseButton>
        <Supreme>Your cart</Supreme>
        <p>You have __ items in your cart</p>
      </header>
      <footer>
        <p>£10.00</p>
        <Button>Checkout</Button>
      </footer>
    </CartStyles>
  );
};

export default Cart;
