import Link from 'next/link';

import {
  ITEMS_ROUTE,
  SELL_ROUTE,
  SIGNUP_ROUTE,
  ORDERS_ROUTE,
  ME_ROUTE
} from '../../constants/routes';
import { NavStyles, SLink } from './style';
import useAuth from '../../customHooks/useAuth';

const Nav = () => {
  const [{ loading, authUser }] = useAuth();
  if (loading) return null;
  const isAuthenticated = authUser.userDetails;
  const name = isAuthenticated ? authUser.userDetails.name : null;
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
