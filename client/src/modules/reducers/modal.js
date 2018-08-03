export const UPLOAD_IMAGE_REQUESTED = 'UPLOAD_IMAGE_REQUESTED';
export const UPLOAD_IMAGE_SUCCEEDED = 'UPLOAD_IMAGE_SUCCEEDED';
export const UPLOAD_IMAGE_FAILED = 'UPLOAD_IMAGE_FAILED';

const initialState = {
  question: {
    title: '',
    body: '',
    isWriteActive: true,
    isPreviewActive: false
  },
  answer: {
    body: '',
    isWriteActive: true,
    isPreviewActive: false
  },
  busy: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUESTED:
      return {
        ...state,
        busy: true,
        error: null
      };

    case UPLOAD_IMAGE_SUCCEEDED:
      const imageURL = action.payload.success[0].location;
      const body = state.question.body;
      const bodyAppended = body + '![](' + imageURL + ')';
      return {
        ...state,
        question: {
          body: bodyAppended
        },
        busy: false,
        error: null
      };

    case GET_ANSWERS_FAILED:
      return {
        ...state,
        busy: false,
        error: action.error
      };

    default:
      return state;
  }
};
