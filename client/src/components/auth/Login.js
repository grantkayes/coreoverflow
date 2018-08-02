import React from 'react';
import { Redirect } from 'react-router-dom';
import Lock from './Lock';
import isAuthenticated from './isAuthenticated';

const PUBLIC_URL = process.env.PUBLIC_URL || '';

const Login = props =>
  isAuthenticated() ? (
    <Redirect
      to={{
        pathname: PUBLIC_URL + '/',
        state: { from: props.location }
      }}
    />
  ) : (
    <Lock location={props.location} />
  );

export default Login;
