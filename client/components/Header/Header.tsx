import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';

import Nav from '../Nav/Nav';

import { Logo, Bar, SubBar } from './style';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', error => {
  NProgress.done();
  console.log('error: ', error);
});

const Header = () => (
  <>
    <Bar>
      <Logo>
        <Link href='/'>
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
