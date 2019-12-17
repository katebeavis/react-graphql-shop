import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { GRAPHQL_ENDPOINT } from '../config';

const createClient = ({ headers }: any) => {
  return new ApolloClient({
    uri:
      process.env.NODE_ENV === 'development'
        ? GRAPHQL_ENDPOINT
        : GRAPHQL_ENDPOINT,

    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers
      });
    }
  });
};

export default withApollo(createClient);
