import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import config from './config';

const client = new ApolloClient({
  link: new HttpLink({
    uri: config.graphQLEndpoint,
  }),
  cache: new InMemoryCache(),
});

export default client;
