import { AnyAction } from 'redux';

const REVERSE = 'REVERSE';

export const reverseTodos = (status: boolean) => ({ type: REVERSE, status });

export const getReverseStatus = (state: RootState) => state.isReverse;

export const reverseReducer = (state = { isReverse: false }, action: AnyAction) => {
  switch (action.type) {
    case REVERSE:
      return { ...state, isReverse: action.status };

    default:
      return state;
  }
}
