import axios from 'axios';
import {
  UPLOAD_IMAGE_REQUESTED,
  UPLOAD_IMAGE_SUCCEEDED,
  UPLOAD_IMAGE_FAILED
} from '../reducers/modal';

const PUBLIC_URL = process.env.PUBLIC_URL || '';

const postImage = acceptedFiles => {
  let data = new FormData();

  acceptedFiles.forEach(file => {
    data.append('doc', file);
  });

  return axios.post(PUBLIC_URL + '/upload', data);
};

const uploadImage = acceptedFiles => {
  return (dispatch, getState) => {
    dispatch({
      type: UPLOAD_IMAGE_REQUESTED
    });

    postImage(acceptedFiles)
      .then(response =>
        dispatch({
          type: UPLOAD_IMAGE_SUCCEEDED,
          payload: response.data
        })
      )
      .catch(err =>
        dispatch({
          type: UPLOAD_IMAGE_FAILED,
          error: err
        })
      );
  };
};

export { uploadImage };
