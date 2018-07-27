export const GET_QUESTIONS_REQUESTED = 'GET_QUESTIONS_REQUESTED';
export const GET_QUESTIONS_SUCCEEDED = 'GET_QUESTIONS_SUCEEDED';
export const GET_QUESTIONS_FAILED = 'GET_QUESTIONS_FAILED';
export const GET_MY_QUESTIONS_REQUESTED = 'GET_MY_QUESTIONS_REQUESTED';
export const GET_MY_QUESTIONS_SUCCEEDED = 'GET_MY_QUESTIONS_SUCEEDED';
export const GET_MY_QUESTIONS_FAILED = 'GET_MY_QUESTIONS_FAILED';

const initialState = {
  data: [],
  busy: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS_REQUESTED:
      console.log('get questions requested...');
      return {
        ...state,
        busy: true,
        error: null
      };

    case GET_QUESTIONS_SUCCEEDED:
      console.log('get questions succeeded');
      return {
        ...state,
        data: action.payload.data.Items,
        busy: false,
        error: null
      };

    case GET_QUESTIONS_FAILED:
      console.log('get questions failed');
      return {
        ...state,
        busy: false,
        error: action.error
      };
      
      case GET_MY_QUESTIONS_REQUESTED:
      console.log('getting MY questions requested...');
      return {
        ...state,
        busy: true,
        error: null
      };

    case GET_MY_QUESTIONS_SUCCEEDED:
      console.log('getting MY questions succeeded');
      return {
        ...state,
        data: action.payload.data,
        busy: false,
        error: null
      };

    case GET_MY_QUESTIONS_FAILED:
      console.log('getting MY questions failed');
      return {
        ...state,
        busy: false,
        error: action.error
      };

    default:
      return state;
  }
};
