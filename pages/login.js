import { Component } from 'react';
import withData from '../lib/withData';

import App from '../components/App';
import Header from '../components/Header';

import pagePropTypes from '../lib/pagePropTypes';

class LoginPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    ...pagePropTypes,
  };

  render() {
    const { url } = this.props;

    return (
      <App>
        <Header pathname={url.pathname} />
        <article>
          <h1>Logging in</h1>
          <p>
            Logging you in... have patience.
          </p>
        </article>
      </App>
    );
  }
}


export default withData(LoginPage);
