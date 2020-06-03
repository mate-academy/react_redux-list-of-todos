import { AnyAction } from 'redux';

const ERROR = 'ERROR';

export const setErrorMessage = (message: string) => ({ type: ERROR, message });

export const errorReducer = (state = '', action: AnyAction) => {
  switch (action.type) {
    case ERROR:
      return action.message;

    default:
      return state;
  }
}
