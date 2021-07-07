import { AnyAction } from 'redux';

export type FiltersState = {
  query: string;
  status: string;
};

const initialState = {
  query: '',
  status: 'all',
};

const SET_QUERY = 'filters/SET_QUERY';
const SET_STATUS = 'filters/SET_STATUS';

export const actions = {
  setQuery: (query: string) => ({
    type: SET_QUERY,
    payload: query,
  }),
  setStatus: (status: string) => ({
    type: SET_STATUS,
    payload: status,
  }),
};

export const selectors = {
  getQuery: (state: FiltersState) => state.query,
  getStatus: (state: FiltersState) => state.status,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};
