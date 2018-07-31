export const GET_ANSWERS_REQUESTED = 'GET_ANSWERS_REQUESTED';
export const GET_ANSWERS_SUCCEEDED = 'GET_ANSWERS_SUCEEDED';
export const GET_ANSWERS_FAILED = 'GET_ANSWERS_FAILED';
export const EDIT_ANSWER_REQUESTED = 'EDIT_ANSWER_REQUESTED';
export const EDIT_ANSWER_SUCCEEDED = 'EDIT_ANSWER_SUCCEEDED';
export const EDIT_ANSWER_FAILED = 'EDIT_ANSWER_FAILED';

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
      console.log(action.payload);
      return {
        ...state,
        data: action.payload.data,
        busy: false,
        error: null
      };

    case GET_ANSWERS_FAILED:
      console.log('get answers failed');
      return {
        ...state,
        busy: false,
        error: action.error
      };

    case EDIT_ANSWER_REQUESTED:
      console.log('edit answers requested');

      return {
        ...state,
        busy: true,
        error: null
      };

    case EDIT_ANSWER_SUCCEEDED:
      console.log('edit answers succeeded');
      const { data } = action.payload;

      const answerId = data.id;
      const changes = data.data;

      const answers = state.data.map(
        answer =>
          answerId === answer.id
            ? {
                ...answer,
                ...changes
              }
            : answer
      );

      return {
        ...state,
        data: answers,
        busy: false,
        error: null
      };
    // return { ...state };

    case EDIT_ANSWER_FAILED:
      console.log('edit answer failed');
      console.log(action.error);
      return {
        ...state,
        busy: false,
        error: action.error
      };

    default:
      return state;
  }
};
