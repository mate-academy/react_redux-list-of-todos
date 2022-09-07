import { Status } from '../types/Status';

const setQuery = (queryText: string) => ({
  type: 'SET_QUERY',
  payload: queryText,
});

const setSortType = (SortType: SortType) => ({
  type: SortType,
});

export const filterActions = { setQuery, setSortType };

export type FilterState = {
  query: string,
  status: Status,
};

export type SortType = 'active' | 'completed' | 'all';

type Action = {
  type: SortType | 'SET_QUERY',
  payload: string,

};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

const filterReducer = (state: FilterState = initialState, action: Action) => {
  switch (action.type) {
    case 'active':
      return {
        ...state,
        status: 'active',
      };
    case 'completed':
      return {
        ...state,
        status: 'completed',
      };
    case 'all':
      return {
        ...state,
        status: 'all',
      };
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
