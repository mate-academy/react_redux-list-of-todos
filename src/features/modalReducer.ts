type ModalToggleAction = {
  type: 'modal/TOGGLE';
  payload: boolean;
};

const showModal = ():ModalToggleAction => ({
  type: 'modal/TOGGLE',
  payload: true,
});

const closeModal = ():ModalToggleAction => ({
  type: 'modal/TOGGLE',
  payload: false,
});

export const modalActions = {
  show: showModal,
  close: closeModal,
};

export const modalReducer = (state = false, action:ModalToggleAction) => {
  if (action.type === 'modal/TOGGLE') {
    return action.payload;
  }

  return state;
};
