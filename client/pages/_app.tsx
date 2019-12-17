import Layout from '../components/Layout/Layout';
import { ApolloProvider } from 'react-apollo';
import withApollo from '../lib/withApollo';
import App from 'next/app';

interface IProps extends App {
  apollo: any;
}

class MyApp extends App<IProps> {
  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
