import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from '../Header/Header';
import Meta from '../Meta/Meta';

import { theme, Container, Inner } from './style';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    font-style: normal;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
`;

const Layout = ({ children }: any) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Container>
      <Meta />
      <Header />
      <Inner>{children}</Inner>
    </Container>
  </ThemeProvider>
);

export default Layout;
