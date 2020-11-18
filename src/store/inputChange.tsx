import { AnyAction } from 'redux';

const INPUT_CHANGE = 'INPUT_CHANGE';

export const sortByInput = (inputChange: string) => ({ type: INPUT_CHANGE, inputChange});

const reducer = (inputChange = '', action: AnyAction) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return action.inputChange;

    default:
      return inputChange;
  }
};

export default reducer;
