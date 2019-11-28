const Home = ({ userAgent }: any) => (
  <h1>Hello world! - user agent: {userAgent}</h1>
);

Home.getInitialProps = async ({ req }: any) => {
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  return { userAgent };
};

export default Home;
