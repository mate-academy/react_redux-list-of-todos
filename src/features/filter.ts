import { Status } from '../types/Status';

/* eslint-disable @typescript-eslint/default-param-last */
type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
  query: '',
  status: Status.All,
};

type SetQueryAction = { type: 'filter/SET_QUERY'; payload: string };
type SetFilterAction = { type: 'filter/SET_FILTER'; payload: Status };

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setFilter = (filter: Status): SetFilterAction => ({
  type: 'filter/SET_FILTER',
  payload: filter,
});

type Action = SetFilterAction | SetQueryAction;

export const actions = {
  setFilter,
  setQuery,
};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_FILTER':
      return { ...state, status: action.payload };

    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
