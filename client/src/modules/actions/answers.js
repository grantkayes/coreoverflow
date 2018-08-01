import axios from 'axios';
import {
  ANSWERS_ACTION_REQUESTED,
  GET_ANSWERS_SUCCEEDED,
  GET_ANSWERS_FAILED,
  EDIT_ANSWER_SUCCEEDED,
  EDIT_ANSWER_FAILED,
  SUBMIT_ANSWER_SUCCEEDED,
  SUBMIT_ANSWER_FAILED
} from '../reducers/answers';

const PUBLIC_URL = process.env.PUBLIC_URL || '';

const retrieveAnswers = questionId => {
  return axios.get(PUBLIC_URL + `/answers/?questionId=${questionId}`);
};

const getAnswers = questionId => {
  return (dispatch, getState) => {
    dispatch({
      type: ANSWERS_ACTION_REQUESTED
    });

    retrieveAnswers(questionId)
      .then(response =>
        dispatch({
          type: GET_ANSWERS_SUCCEEDED,
          payload: response.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ANSWERS_FAILED,
          error: err
        })
      );
  };
};

const postAnswers = body => {
  return axios.post(PUBLIC_URL + `/answers`, body);
};

const submitAnswer = body => {
  return (dispatch, getState) => {
    dispatch({
      type: ANSWERS_ACTION_REQUESTED
    });

    postAnswers(body)
      .then(response =>
        dispatch({
          type: SUBMIT_ANSWER_SUCCEEDED,
          payload: response.data
        })
      )
      .catch(err =>
        dispatch({
          type: SUBMIT_ANSWER_FAILED,
          error: err
        })
      );
  };
};

const patchAnswer = (answerId, body) => {
  return axios.patch(PUBLIC_URL + `/answers/${answerId}`, body);
};

const editAnswer = (answerId, body) => {
  return (dispatch, getState) => {
    dispatch({
      type: ANSWERS_ACTION_REQUESTED
    });

    patchAnswer(answerId, body)
      .then(response =>
        dispatch({
          type: EDIT_ANSWER_SUCCEEDED,
          payload: response.data
        })
      )
      .catch(err =>
        dispatch({
          type: EDIT_ANSWER_FAILED,
          error: err
        })
      );
  };
};

export { getAnswers, editAnswer, submitAnswer };
