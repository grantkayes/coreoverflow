export const GET_ANSWERS_REQUESTED = 'GET_ANSWERS_REQUESTED';
export const GET_ANSWERS_SUCCEEDED = 'GET_ANSWERS_SUCEEDED';
export const GET_ANSWERS_FAILED = 'GET_ANSWERS_FAILED';

const initialState = {
  data: [],
  busy: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ANSWERS_REQUESTED:
      console.log('get answers requested...');
      return {
        ...state,
        busy: true,
        error: null
      };

    case GET_ANSWERS_SUCCEEDED:
      console.log('get answers succeeded');

      return {
        ...state,
        data: action.payload.response.data,
        busy: false,
        error: null
      };

    case GET_ANSWERS_FAILED:
      console.log('get answers failed');
      return {
        ...state,
        busy: false,
        error: action.payload.error
      };

    default:
      return state;
  }
};
