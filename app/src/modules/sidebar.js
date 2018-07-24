export const TOGGLE_MODAL = 'sidebar/TOGGLE_MODAL'

const initialState = {
  isModalOpen: false 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      }
    default: 
      return state
  }
}

export const toggleModal = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_MODAL
    })
  }
}