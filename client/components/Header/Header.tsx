import Link from 'next/link';

import Nav from '../Nav/Nav';

import { Logo, Bar, SubBar } from './style';

const Header = () => (
  <>
    <Bar>
      <Logo>
        <Link href="/">
          <a>React GraphQL store</a>
        </Link>
      </Logo>
      <Nav />
    </Bar>
    <SubBar>
      <p>Search</p>
    </SubBar>
    <>Cart</>
  </>
);

export default Header;
