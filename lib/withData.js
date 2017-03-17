import 'isomorphic-fetch'; // eslint-disable-line import/no-extraneous-dependencies
import React, { PropTypes } from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { initClient } from './initClient';
import { initStore } from './initStore';
import { getAuthToken } from './authTokens';

export default Component => (
  class ApolloDataProvider extends React.Component {
    static propTypes = {
      headers: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
      initialState: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
      userToken: PropTypes.string,
    };

    static defaultProps = {
      userToken: '',
    };

    static async getInitialProps(ctx) {
      const headers = ctx.req ? ctx.req.headers : {};
      const userToken = getAuthToken(ctx.req);

      const client = initClient(headers, userToken);
      const store = initStore(client, client.initialState);

      const props = {
        url: { query: ctx.query, pathname: ctx.pathname },
        ...await (Component.getInitialProps ? Component.getInitialProps(ctx) : {}),
      };

      if (!process.browser) {
        const app = (
          <ApolloProvider client={client} store={store}>
            <Component {...props} />
          </ApolloProvider>
        );
        await getDataFromTree(app);
      }

      const state = store.getState();

      return {
        initialState: {
          ...state,
          apollo: client.getInitialState(),
        },
        headers,
        userToken,
        ...props,
      };
    }

    constructor(props) {
      super(props);

      if (process.browser) {
        localStorage.setItem('userToken', props.userToken);
      }

      this.client = initClient(this.props.headers, props.userToken);
      this.store = initStore(this.client, this.props.initialState);
    }

    render() {
      return (
        <ApolloProvider client={this.client} store={this.store}>
          <Component {...this.props} />
        </ApolloProvider>
      );
    }
  }
);
