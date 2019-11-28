import Header from "./Header";
import Meta from "./Meta";

const Layout = ({ children }: any) => {
  return (
    <>
      <Meta />
      <Header />
      {children}
    </>
  );
};

export default Layout;
