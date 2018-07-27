import axios from 'axios';
import {
  GET_ANSWERS_REQUESTED,
  GET_ANSWERS_SUCCEEDED,
  GET_ANSWERS_FAILED
} from '../reducers/answers';

const retrieveAnswers = questionId => {
  return axios.get(`localhost:5000/answers/?questionId=${questionId}`);
};

const getAnswers = questionId => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_ANSWERS_REQUESTED
    });

    retrieveAnswers(questionId)
      .then(response =>
        dispatch({
          type: GET_ANSWERS_SUCCEEDED,
          payload: response
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

export { getAnswers };
