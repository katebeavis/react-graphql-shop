import Link from 'next/link';

import { NavStyles, SLink } from './style';

const Nav = () => (
  <NavStyles>
    <Link href='/items'>
      <SLink>Shop</SLink>
    </Link>
    <Link href='/sell'>
      <SLink>Sell</SLink>
    </Link>
    <Link href='/signup'>
      <SLink>Signup</SLink>
    </Link>
    <Link href='/orders'>
      <SLink>Orders</SLink>
    </Link>
    <Link href='/me'>
      <SLink>Account</SLink>
    </Link>
  </NavStyles>
);

export default Nav;
