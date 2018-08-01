import moment from 'moment'

export const GET_QUESTIONS_REQUESTED = 'GET_QUESTIONS_REQUESTED';
export const GET_QUESTIONS_SUCCEEDED = 'GET_QUESTIONS_SUCEEDED';
export const GET_QUESTIONS_FAILED = 'GET_QUESTIONS_FAILED';
export const GET_MY_QUESTIONS_REQUESTED = 'GET_MY_QUESTIONS_REQUESTED';
export const GET_MY_QUESTIONS_SUCCEEDED = 'GET_MY_QUESTIONS_SUCEEDED';
export const GET_MY_QUESTIONS_FAILED = 'GET_MY_QUESTIONS_FAILED';
export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
export const DELETE_MY_QUESTION = 'DELETE_MY_QUESTION';
export const DELETE_MY_QUESTION_FAILED = 'DELETE_MY_QUESTION_FAILED';
export const GET_CURRENT_QUESTION_REQUESTED = 'GET_CURRENT_QUESTION_REQUESTED';
export const GET_CURRENT_QUESTION_SUCCEEDED = 'GET_CURRENT_QUESTION_SUCEEDED';
export const GET_CURRENT_QUESTION_FAILED = 'GET_CURRENT_QUESTION_FAILED';

const initialState = {
  data: [],
  searchData: [],
  currentQuestion: {},
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
      let payload = action.payload.data.Items

      //Sort by most recent time
      payload.sort(function(time1, time2){
        return moment(time1.timestamp) - moment(time2.timestamp)
      })

      return {
        ...state,
        data: payload,
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

    case GET_CURRENT_QUESTION_REQUESTED:
      console.log('getting current question requested...');
      return {
        ...state,
        busy: true,
        error: null
      };

    case GET_CURRENT_QUESTION_SUCCEEDED:
      console.log('getting current question succeeded...');
       console.log('action.payload', action.payload.data.data)
      return {
        ...state,
        currentQuestion: action.payload.data.data,
        busy: false,
        error: null
      };

    case GET_CURRENT_QUESTION_FAILED:
      console.log('getting current question failed...');
      return {
        ...state,
        busy: false,
        error: action.error
      };

    case GET_SEARCH_RESULTS:
      console.log('getting search results');
      let searchterm = action.payload.toLowerCase();

      // Traverse data matching searchterm
      const filtered = state.data.filter(question => {
        let questionTitle = question.questionTitle.toLowerCase();
        let questionBody = question.body.toLowerCase();

        return (questionTitle.includes(searchterm) || questionBody.includes(searchterm))
      })

      return {
        ...state,
        busy: false,
        error: action.error,
        searchData: filtered
      }

    case DELETE_MY_QUESTION:
      console.log('delete my question');
      return

    case DELETE_MY_QUESTION_FAILED:
      console.log('delete my question failed');
      return

    default:
      return state;
  }
};
