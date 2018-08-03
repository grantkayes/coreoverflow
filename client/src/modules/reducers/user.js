export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

const initialState = {
  data: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        data: action.payload
      };

    case LOGOUT_USER:
      return {
        ...state,
        data: {}
      };

    default:
      return state;
  }
};
