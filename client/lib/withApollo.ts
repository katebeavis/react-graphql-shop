import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { getDataFromTree } from '@apollo/react-ssr';

import { GRAPHQL_ENDPOINT } from '../config';
import { LOCAL_STATE_QUERY } from '../queries/queries';

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
    },
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_root, variables, { cache }) {
            const { cartOpen } = cache.readQuery({ query: LOCAL_STATE_QUERY });
            const data = { data: { cartOpen: !cartOpen } };
            cache.writeData(data);
            return data;
          }
        }
      },
      defaults: {
        cartOpen: false
      }
    }
  });
};

export default withApollo(createClient, { getDataFromTree });
