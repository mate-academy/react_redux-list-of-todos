import { Action } from 'redux';

const ERROR = 'ERROR';

type Error = Action<typeof ERROR> & { message: string };

export const setTodosAction = (message: string): Error => ({ type: ERROR, message });

const errorMessageReducer = (state = '', action: Error) => {
  switch (action.type) {
    case ERROR:
      return action.message;

    default:
      return state;
  }
};

export default errorMessageReducer;
