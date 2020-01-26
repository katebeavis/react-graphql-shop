import Link from 'next/link';
import { useMutation } from 'react-apollo';

import CartCount from '../CartCount/CartCount';

import {
  ITEMS_ROUTE,
  SELL_ROUTE,
  SIGNUP_ROUTE,
  ORDERS_ROUTE,
  ME_ROUTE
} from '../../constants/routes';
import { NavStyles, SLink } from './Nav.style';
import useUser from '../../customHooks/useUser';
import SignOut from '../SignOut/SignOut';
import Error from '../Error/Error';
import { TOGGLE_CART_MUTATION } from '../../mutations/mutations';

const Nav = () => {
  const { loading, error, data } = useUser();
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);

  if (loading) return null;
  if (error) return <Error error={error} />;

  const { userDetails } = data;

  const isAuthenticated = !!userDetails;

  return (
    <NavStyles>
      <Link href={ITEMS_ROUTE}>
        <SLink>Shop</SLink>
      </Link>
      {isAuthenticated && (
        <>
          <Link href={SELL_ROUTE}>
            <SLink>Sell</SLink>
          </Link>

          <Link href={ORDERS_ROUTE}>
            <SLink>Orders</SLink>
          </Link>
          <Link href={ME_ROUTE}>
            <SLink>Account</SLink>
          </Link>
          <SignOut />

          <button onClick={() => toggleCart()}>
            Cart{' '}
            <CartCount
              count={userDetails.cart.reduce(
                (tally: number, cartItem: any) => tally + cartItem.quantity,
                0
              )}
            ></CartCount>
          </button>
        </>
      )}
      {!isAuthenticated && (
        <Link href={SIGNUP_ROUTE}>
          <SLink>Sign In</SLink>
        </Link>
      )}
    </NavStyles>
  );
};

export default Nav;
