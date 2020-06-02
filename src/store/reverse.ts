import { AnyAction } from 'redux';

const REVERSE = 'REVERSE';

export const setReverseValue = (status: boolean) => ({ type: REVERSE, status });

export const reverseReducer = (state = false, action: AnyAction) => {
  switch (action.type) {
    case REVERSE:
      return !state;

    default:
      return state;
  }
}
