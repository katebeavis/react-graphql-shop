import Link from 'next/link';

import {
  ITEMS_ROUTE,
  SELL_ROUTE,
  SIGNUP_ROUTE,
  ORDERS_ROUTE,
  ME_ROUTE
} from '../../constants/routes';
import { NavStyles, SLink } from './style';

const Nav = () => (
  <NavStyles>
    <Link href={ITEMS_ROUTE}>
      <SLink>Shop</SLink>
    </Link>
    <Link href={SELL_ROUTE}>
      <SLink>Sell</SLink>
    </Link>
    <Link href={SIGNUP_ROUTE}>
      <SLink>Signup</SLink>
    </Link>
    <Link href={ORDERS_ROUTE}>
      <SLink>Orders</SLink>
    </Link>
    <Link href={ME_ROUTE}>
      <SLink>Account</SLink>
    </Link>
  </NavStyles>
);

export default Nav;
