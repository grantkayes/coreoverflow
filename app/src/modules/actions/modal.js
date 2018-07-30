import axios from 'axios';
import {
  UPLOAD_IMAGE_REQUESTED,
  UPLOAD_IMAGE_SUCCEEDED,
  UPLOAD_IMAGE_FAILED
} from '../reducers/modal';

const postImage = acceptedFiles => {
    let data = new FormData();

    acceptedFiles.forEach(file => {
      data.append('doc', file);
    });

    return axios.post('http://localhost:5000/upload', data);
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