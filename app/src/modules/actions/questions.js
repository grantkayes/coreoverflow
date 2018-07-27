import axios from 'axios';

import {
  GET_QUESTIONS_REQUESTED,
  GET_QUESTIONS_SUCCEEDED,
  GET_QUESTIONS_FAILED,
  GET_MY_QUESTIONS_REQUESTED,
  GET_MY_QUESTIONS_SUCCEEDED,
  GET_MY_QUESTIONS_FAILED,
  GET_SEARCH_RESULTS
} from '../reducers/questions';

//TODO: Remove hard coded userId
const USER_ID = 2

const getQuestions = () => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_QUESTIONS_REQUESTED
    });

    axios.get('http://localhost:5000/questions/')
    .then(response =>
      dispatch({
        type: GET_QUESTIONS_SUCCEEDED,
        payload: response
      })
    )
    .catch(err =>
      dispatch({
        type: GET_QUESTIONS_FAILED,
        error: err
      })
    );
  };
};

const getMyQuestions = () => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_MY_QUESTIONS_REQUESTED
    });

    // Get all my questions associated with my userId
    axios.get(`http://localhost:5000/questions/${USER_ID}`)
    .then( response => {
      dispatch({
        type: GET_MY_QUESTIONS_SUCCEEDED,
        payload: response
      })
    })
    .catch( err => {
      dispatch({
        type: GET_MY_QUESTIONS_FAILED,
        error: err
      })
    })
  }
}

const getSearchResults = (searchTerm) => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_SEARCH_RESULTS,
      payload: searchTerm
    });
  };
}

export { getQuestions, getMyQuestions, getSearchResults };




