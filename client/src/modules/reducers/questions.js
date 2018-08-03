import moment from 'moment'

export const GET_QUESTIONS_REQUESTED = 'GET_QUESTIONS_REQUESTED';
export const GET_QUESTIONS_SUCCEEDED = 'GET_QUESTIONS_SUCEEDED';
export const GET_QUESTIONS_FAILED = 'GET_QUESTIONS_FAILED';
export const GET_MY_QUESTIONS_REQUESTED = 'GET_MY_QUESTIONS_REQUESTED';
export const GET_MY_QUESTIONS_SUCCEEDED = 'GET_MY_QUESTIONS_SUCEEDED';
export const GET_MY_QUESTIONS_FAILED = 'GET_MY_QUESTIONS_FAILED';
export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
export const DELETE_MY_QUESTION_REQUESTED = 'DELETE_MY_QUESTION_REQUESTED';
export const DELETE_MY_QUESTION_SUCCEEDED = 'DELETE_MY_QUESTION_SUCCEEDED'
export const DELETE_MY_QUESTION_FAILED = 'DELETE_MY_QUESTION_FAILED';
export const GET_CURRENT_QUESTION_REQUESTED = 'GET_CURRENT_QUESTION_REQUESTED';
export const GET_CURRENT_QUESTION_SUCCEEDED = 'GET_CURRENT_QUESTION_SUCEEDED';
export const GET_CURRENT_QUESTION_FAILED = 'GET_CURRENT_QUESTION_FAILED';
export const UPDATE_QUESTIONS_REQUESTED = 'UPDATE_QUESTIONS_REQUESTED';
export const UPDATE_QUESTIONS_SUCCEEDED = 'UPDATE_QUESTIONS_SUCCEEDED';
export const UPDATE_QUESTIONS_FAILED = 'UPDATE_QUESTIONS_FAILED';
export const SUBMIT_QUESTION_SUCCEEDED = 'SUBMIT_QUESTION_SUCCEEDED';

const initialState = {
  data: [],
  searchData: [],
  currentQuestion: {},
  busy: false,
  loading: false,
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
        return moment(time2.timestamp) - moment(time1.timestamp)
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
        loading: true,
        error: null
      };

    case GET_CURRENT_QUESTION_SUCCEEDED:
      console.log('getting current question succeeded...');
      return {
        ...state,
        currentQuestion: action.payload.data.data,
        busy: false,
        loading: false,
        error: null
      };

    case GET_CURRENT_QUESTION_FAILED:
      console.log('getting current question failed...');
      return {
        ...state,
        busy: false,
        loading: false,
        error: action.error
      };

    case GET_SEARCH_RESULTS:
      let searchterm = action.payload.toLowerCase();

      // Traverse data matching searchterm
      const filtered = state.data.filter(question => {
        let questionTitle = question.questionTitle.toLowerCase();
        let questionBody = question.body.toLowerCase();
        let questionTags = question.tags;

        return (questionTitle.includes(searchterm) || questionBody.includes(searchterm) || questionTags.includes(searchterm))
      })

      return {
        ...state,
        busy: false,
        error: action.error,
        searchData: filtered
      }

    case DELETE_MY_QUESTION_REQUESTED:
      console.log('delete my question requested..');
      return {
        ...state,
        busy: true,
        error: null
      };
    
    case DELETE_MY_QUESTION_SUCCEEDED:
      console.log('delete my question succeeded');

      
      return {
        ...state,
        data: action.payload.data,
        busy: false,
        error: null
      };

    case DELETE_MY_QUESTION_FAILED:
      console.log('delete my question failed');
      return state;

    case UPDATE_QUESTIONS_REQUESTED:
      console.log('update questions requested...');
      return {
        ...state,
        busy: true,
        error: null
      };

    case UPDATE_QUESTIONS_SUCCEEDED:
      console.log('update questions succeeded');
      const changes = action.payload.dataPayload
      
      //Update state 
      const newArray = state.data.map(
        question => 
          question.id === changes.questionId 
          ? { 
              ...question,
              ...changes
            }
          : question  
      );

      return {
        ...state,
        data: newArray,
        currentQuestion: {...state.currentQuestion, ...changes},
        busy: false,
        error: null
      };

    case UPDATE_QUESTIONS_FAILED:
      console.log('update questions failed');
      return state;

    case SUBMIT_QUESTION_SUCCEEDED:
      console.log('submitting question succeeded');

      return {
        ...state,
        data: [...state.data, action.payload.Attributes]
      }

    default:
      return state;
  }
};
