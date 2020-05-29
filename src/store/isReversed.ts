import { AnyAction } from 'redux';

const REVERSE = 'REVERSE';

export const reverseTodos = (status: boolean) => ({ type: REVERSE, status });

const reverseReducer = (state: boolean, action: AnyAction) => {
  console.log(state)
  switch (action.type) {
    case REVERSE:
      return action.status;

    default:
      return state;
  }
};

export default reverseReducer;
