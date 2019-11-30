import Layout from "../components/Layout/Layout";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
