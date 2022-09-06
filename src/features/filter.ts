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

export type SortType = 'SET_ACTIVE' | 'SET_COMPLETED' | 'SET_ALL';

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
    case 'SET_ACTIVE':
      return {
        ...state,
        status: 'active',
      };
    case 'SET_COMPLETED':
      return {
        ...state,
        status: 'completed',
      };
    case 'SET_ALL':
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
