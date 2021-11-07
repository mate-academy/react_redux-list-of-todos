import { AnyAction } from 'redux';

const CHANGE_QUERY = 'CHANGE_QUERY';

export const actions = {
  changeQuery: (payload: string) => ({ type: CHANGE_QUERY, payload }),
};

export type QueryState = {
  query: string,
};

const queryState: QueryState = {
  query: '',
};

export const queryReducer = (state = queryState, action: AnyAction) => {
  switch (action.type) {
    case CHANGE_QUERY:
      return { ...state, query: action.payload };
    default:
      return state;
  }
};
