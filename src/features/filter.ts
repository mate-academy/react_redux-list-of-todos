import { Status } from '../types/Status';

type FilterChangeAction = {
  type: 'filter/SET_FILTER',
  payload: Status,
};

type QueryAction = {
  type: 'filter/SET_QUERY',
  payload: string,
};

type Action = FilterChangeAction | QueryAction;

const setFilter = (newFilter: Status): FilterChangeAction => ({
  type: 'filter/SET_FILTER',
  payload: newFilter,
});

const setQuery = (query: string): QueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const initialState = {
  filter: 'all',
  query: '',
};

export const actions = { setFilter, setQuery };

const filterReducer = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
