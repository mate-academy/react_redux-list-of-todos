import { AnyAction } from 'redux';

// action type
const CHANGE_QUERY = 'CHANGE_QUERY';

// action creator
export const actions = {
  changeQuery: (payload: string) => ({ type: CHANGE_QUERY, payload }),
};

// initial state
export type QueryState = {
  query: string,
};

const queryState: QueryState = {
  query: '',
};

// reducer
export const queryReducer = (state = queryState, action: AnyAction) => {
  switch (action.type) {
    case CHANGE_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};
