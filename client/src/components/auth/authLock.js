import Auth0Lock from 'auth0-lock';
import { AUTH_CONFIG } from './auth0-variables';

const lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
  allowSignUp: false,
  autoclose: true,
  auth: {
    responseType: 'token id_token',
    sso: false,
    redirect: false,
    params: {
      scope: 'openid profile email'
    }
  },
  container: AUTH_CONFIG.container,
  theme: {
    logo: 'https://images-na.ssl-images-amazon.com/images/I/615dQnf0l1L.png',
    socialButtonStyle: 'large'
  },
  languageDictionary: {
    title: 'Core Overflow'
  }
});

export default lock;
