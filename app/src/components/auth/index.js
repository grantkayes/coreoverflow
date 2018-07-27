import React from 'react';
import { Auth0Lock } from 'auth0-lock';

const lock = new Auth0Lock(
  '9Q7TmqqaleJk7ejP4NgogOH7dMlm9AhK',
  'coreoverflow.auth0.com',
  {
    autoclose: true,
    allowSignUp: false,
    container: 'auth-login-container',
    theme: {
      logo: 'https://images-na.ssl-images-amazon.com/images/I/615dQnf0l1L.png',
    },
  }
)
