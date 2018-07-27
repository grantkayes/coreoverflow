import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthLock from './authLock';
import { AUTH_CONFIG } from './auth0-variables';
import './index.css'

class Lock extends Component {

  constructor(props) {
    super(props);
    this.state = { loggedIn : false };
    this.onAuthenticated = this.onAuthenticated.bind(this);

    this.onAuthenticated();
  }

  onAuthenticated() {
    AuthLock.on('authenticated', (authResult) => {
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);

      this.setState({ loggedIn: true });
    });
  }

  componentDidMount() {
    // Avoid showing Lock when hash is parsed.
    AuthLock.show()
  }

  render() {
    console.log('lock')
    return(
      !this.state.loggedIn ? (
        <div>
          <div id={AUTH_CONFIG.container} className='login-card'></div>
        </div>
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: this.props.location }
        }} />
      )
    );
  }
}

export default Lock;
