import axios from 'axios';
import {
  GET_ANSWERS_REQUESTED,
  GET_ANSWERS_SUCCEEDED,
  GET_ANSWERS_FAILED,
  EDIT_ANSWER_REQUESTED,
  EDIT_ANSWER_SUCCEEDED,
  EDIT_ANSWER_FAILED
} from '../reducers/answers';

const retrieveAnswers = questionId => {
  return axios.get(`http://localhost:5000/answers/?questionId=${questionId}`);
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

const patchAnswer = (answerId, body) => {
  console.log(answerId);
  return axios.patch(`http://localhost:5000/answers/${answerId}`, {
    data: body
  });
};

const editAnswer = (answerId, body) => {
  return (dispatch, getState) => {
    dispatch({
      type: EDIT_ANSWER_REQUESTED
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

export { getAnswers, editAnswer };
