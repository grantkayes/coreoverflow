import moment from 'moment';

export const ANSWERS_ACTION_REQUESTED = 'ANSWERS_ACTION_REQUESTED';

export const GET_ANSWERS_SUCCEEDED = 'GET_ANSWERS_SUCEEDED';
export const GET_ANSWERS_FAILED = 'GET_ANSWERS_FAILED';
export const SUBMIT_ANSWER_SUCCEEDED = 'SUBMIT_ANSWER_SUCCEEDED';
export const SUBMIT_ANSWER_FAILED = 'SUBMIT_ANSWER_FAILED';
export const EDIT_ANSWER_SUCCEEDED = 'EDIT_ANSWER_SUCCEEDED';
export const EDIT_ANSWER_FAILED = 'EDIT_ANSWER_FAILED';

const initialState = {
  data: [],
  busy: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ANSWERS_ACTION_REQUESTED:
      console.log('answers requested...');
      return {
        ...state,
        busy: true,
        error: null
      };

    case GET_ANSWERS_SUCCEEDED:
      console.log('get answers succeeded');
      const payload = action.payload.data;

      //Sort by most recent time
      payload.sort(
        (answer1, answer2) =>
          moment(answer2.timestamp) - moment(answer1.timestamp)
      );

      return {
        ...state,
        data: payload,
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

    case SUBMIT_ANSWER_SUCCEEDED:
      console.log('submit answer succeeded');
      console.log(
        'action payload for submitting answers: ' + action.payload.data
      );

      const newData = [action.payload.data, ...state.data];

      return {
        ...state,
        data: newData,
        busy: false,
        error: null
      };

    case SUBMIT_ANSWER_FAILED:
      console.log('submit answer failed');
      console.log(action.error);
      return {
        ...state,
        busy: false,
        error: action.error
      };

    case EDIT_ANSWER_SUCCEEDED:
      console.log('edit answers succeeded');
      const { data } = action.payload;
      console.log('data', data)
      const answerId = data.id;
      const changes = data;

      const answers = state.data.map(
        answer =>
          answerId === answer.id
            ? {
                ...answer,
                ...changes
              }
            : answer
      );

      console.log('new ans', answers)

      return {
        ...state,
        data: answers,
        busy: false,
        error: null
      };

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
