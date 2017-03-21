import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

let apolloClient = null;

const { GRAPHCOOL_PROJECT_ID } = process.env;

function getNetworkInterface() {
  const networkInterface = createNetworkInterface({
    uri: `https://api.graph.cool/simple/v1/${GRAPHCOOL_PROJECT_ID}`,
    opts: {
      credentials: 'same-origin',
      // Pass headers here if your graphql server requires them
    },
  });

  if (!process.browser) {
    return networkInterface;
  }

  // Create WebSocket client
  const wsClient = new SubscriptionClient(`wss://subscriptions.graph.cool/v1/${GRAPHCOOL_PROJECT_ID}`, {
    reconnect: true,
    connectionParams: {
      // Pass any arguments you want for initialization
    },
  });

  // Extend the network interface with the WebSocket
  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient,
  );

  return networkInterfaceWithSubscriptions;
}

function createClient(headers, userToken) {
  const networkInterface = getNetworkInterface();

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

