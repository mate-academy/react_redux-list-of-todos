import { Status } from '../types/Status';

type FilterAction = {
  type: 'SET_FILTER',
  payload: Status,
};

type QueryAction = {
  type: 'SET_QUERY',
  payload: string,
};

const setFilter = (status: Status): FilterAction => ({
  type: 'SET_FILTER',
  payload: status,
});

const setQuery = (query: string): QueryAction => ({
  type: 'SET_QUERY',
  payload: query,
});

const initialState = {
  status: 'all',
  query: '',
};

type Action = FilterAction | QueryAction;

export const actions = { setFilter, setQuery };

const filterReducer = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        status: action.payload,
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
