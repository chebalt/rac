import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
const jssConfig = require('./src/temp/config');

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${jssConfig.graphQLEndpointPath}?sc_apikey=${jssConfig.sitecoreApiKey}`,
  }),
  cache: new InMemoryCache(),
});

export default client;
