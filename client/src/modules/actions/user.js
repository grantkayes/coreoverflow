import {
  LOGIN_USER,
  LOGOUT_USER,
} from '../reducers/user';

const login = (user) => {
  return (dispatch, getState) => {
    dispatch({
      type: LOGIN_USER,
      payload: user,
    });
  }
}

const logout = () => {
  return (dispatch, getState) => {
    dispatch({
      type: LOGOUT_USER,
    });
  }
}

export { login, logout };
