import Link from 'next/link';

import {
  ITEMS_ROUTE,
  SELL_ROUTE,
  SIGNUP_ROUTE,
  ORDERS_ROUTE,
  ME_ROUTE
} from '../../constants/routes';
import { NavStyles, SLink } from './Nav.style';
import useAuth from '../../customHooks/useAuth';
import SignOut from '../SignOut/SignOut';
import Error from '../Error/Error';

const Nav = () => {
  const [loading, error, data] = useAuth();
  if (loading) return null;
  if (error) return <Error error={error} />;
  const isAuthenticated = data.userDetails;
  const name = isAuthenticated ? data.userDetails.name : null;
  console.log(name);
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
