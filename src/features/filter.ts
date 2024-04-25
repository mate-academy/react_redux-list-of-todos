import type { Action, SetAction } from '../types/FilterActions';
import type { Status } from '../types/Status';

export const actions = {
  setQuery: (query: string): SetAction => ({
    type: 'SET_QUERY',
    payload: query,
  }),

  setStatus: (status: Status): SetAction => ({
    type: 'SET_STATUS',
    payload: status,
  }),
};

const initialState = {
  query: '',
  status: 'all',
};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
