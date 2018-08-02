import axios from 'axios';

import {
  GET_QUESTIONS_REQUESTED,
  GET_QUESTIONS_SUCCEEDED,
  GET_QUESTIONS_FAILED,
  GET_MY_QUESTIONS_REQUESTED,
  GET_MY_QUESTIONS_SUCCEEDED,
  GET_MY_QUESTIONS_FAILED,
  GET_CURRENT_QUESTION_REQUESTED,
  GET_CURRENT_QUESTION_SUCCEEDED,
  GET_CURRENT_QUESTION_FAILED,
  GET_SEARCH_RESULTS,
  DELETE_MY_QUESTION_REQUESTED,
  DELETE_MY_QUESTION_SUCCEEDED,
  DELETE_MY_QUESTION_FAILED,
  UPDATE_QUESTIONS_REQUESTED,
  UPDATE_QUESTIONS_SUCCEEDED,
  UPDATE_QUESTIONS_FAILED
} from '../reducers/questions';

const PUBLIC_URL = process.env.PUBLIC_URL || '';

const getQuestions = () => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_QUESTIONS_REQUESTED
    });

    axios
      .get(PUBLIC_URL + '/questions/')
      .then(response => {
        return dispatch({
          type: GET_QUESTIONS_SUCCEEDED,
          payload: response
        });
      })
      .catch(err =>
        dispatch({
          type: GET_QUESTIONS_FAILED,
          error: err
        })
      );
  };
};

const updateQuestions = updateData => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_QUESTIONS_REQUESTED
    });

    axios
      .patch(PUBLIC_URL + `/questions/${updateData.questionId}`, {
        title: updateData.title,
        text: updateData.body,
        tags: updateData.tags,
        claps: updateData.claps
      })
      .then(response => {
        return dispatch({
          type: UPDATE_QUESTIONS_SUCCEEDED,
          payload: response.data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: UPDATE_QUESTIONS_FAILED,
          error: err
        });
      });
  };
};

const getMyQuestions = user => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_MY_QUESTIONS_REQUESTED
    });

    // Get all my questions associated with my userId
    axios
      .get(PUBLIC_URL + `/questions/${user.email}`)
      .then(response => {
        dispatch({
          type: GET_MY_QUESTIONS_SUCCEEDED,
          payload: response
        });
      })
      .catch(err => {
        dispatch({
          type: GET_MY_QUESTIONS_FAILED,
          error: err
        });
      });
  };
};

const getCurrentQuestion = id => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_CURRENT_QUESTION_REQUESTED
    });

    // Get all my questions associated with my userId
    axios
      .get(PUBLIC_URL + `/questions/?id=${id}`)
      .then(response => {
        dispatch({
          type: GET_CURRENT_QUESTION_SUCCEEDED,
          payload: response
        });
      })
      .catch(err => {
        dispatch({
          type: GET_CURRENT_QUESTION_FAILED,
          error: err
        });
      });
  };
};

const getSearchResults = searchTerm => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_SEARCH_RESULTS,
      payload: searchTerm
    });
  };
};

const deleteMyQuestions = questionId => {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_MY_QUESTION_REQUESTED
    });

    axios
      .delete(PUBLIC_URL + `/questions/${questionId}`)
      .then(response => {
        console.log(response);

        dispatch({
          type: DELETE_MY_QUESTION_SUCCEEDED,
          payload: response
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: DELETE_MY_QUESTION_FAILED,
          error: err
        });
      });
  };
};

export {
  getQuestions,
  getMyQuestions,
  getCurrentQuestion,
  getSearchResults,
  deleteMyQuestions,
  updateQuestions
};
