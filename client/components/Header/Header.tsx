import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';

import Nav from '../Nav/Nav';

import { Logo, Bar, SubBar } from './style';

const handleRouteChange = () => NProgress.start();
const handleRouteChangeComplete = () => NProgress.done();
const handleRouteChangeError = (error: any) => {
  NProgress.done();
  console.log('error: ', error);
};

Router.events.on('routeChangeStart', handleRouteChange);
Router.events.on('routeChangeComplete', handleRouteChangeComplete);
Router.events.on('routeChangeError', handleRouteChangeError);

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
