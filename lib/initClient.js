import { ApolloClient, createNetworkInterface } from 'react-apollo';

let apolloClient = null;

function createClient(headers, userToken) {
  const networkInterface = createNetworkInterface({
    uri: process.env.GRAPHQL_URI,
    opts: {
      credentials: 'same-origin',
      // Pass headers here if your graphql server requires them
    },

  });

  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // eslint-disable-line no-param-reassign
      }

      if (userToken) {
        req.options.headers.authorization = `Bearer ${userToken}`; // eslint-disable-line no-param-reassign
      } else if (req.options.headers.authorization) {
        delete req.options.headers.authorization; // eslint-disable-line no-param-reassign
      }

      next();
    },
  }]);


  return new ApolloClient({
    ssrMode: !process.browser,
    dataIdFromObject: result => result.id || null,
    networkInterface,
  });
}

export const initClient = (headers, userToken) => {
  if (!process.browser) {
    return createClient(headers, userToken);
  }
  if (!apolloClient) {
    apolloClient = createClient(headers, userToken);
  }
  return apolloClient;
};

export default initClient;

