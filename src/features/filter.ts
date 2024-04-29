import { Status } from '../types/Status';

type SetFitler = { type: 'FILTER/SET_STATUS'; payload: Status };
type SetQuery = { type: 'FILTER/SET_QUERY'; payload: string };
type ClearQuery = { type: 'FILTER/CLEAR_QUERY' };

type Action = SetFitler | SetQuery | ClearQuery;

const setFilter = (status: Status): SetFitler => ({
  type: 'FILTER/SET_STATUS',
  payload: status,
});

const setQuery = (query: string): SetQuery => ({
  type: 'FILTER/SET_QUERY',
  payload: query,
});

const clearQuery = (): ClearQuery => ({
  type: 'FILTER/CLEAR_QUERY',
});

export const actions = {
  setFilter,
  setQuery,
  clearQuery,
};

type Filter = { query: string; status: Status };

const initialState: Filter = {
  query: '',
  status: 'all',
};

const filterReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  filter: Filter = initialState,
  action: Action,
): Filter => {
  switch (action.type) {
    case 'FILTER/SET_STATUS':
      return {
        ...filter,
        status: action.payload,
      };

    case 'FILTER/SET_QUERY':
      return {
        ...filter,
        query: action.payload,
      };

    case 'FILTER/CLEAR_QUERY':
      return {
        ...filter,
        query: '',
      };

    default:
      return filter;
  }
};

export default filterReducer;
