import { CartStyles, Supreme } from './Cart.style';
import { Button, CloseButton } from '../../shared/shared.style';

const Cart = () => {
  return (
    <CartStyles open>
      <header>
        <CloseButton title='close'>&times;</CloseButton>
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
