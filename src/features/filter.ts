import { Status } from '../types/Status';

type SetFilter = { type: 'filter/setFilter'; payload: Status };
type SetQuery = { type: 'filter/setQuery'; payload: string };
type ClearQuery = { type: 'filter/clearQuery' };

type Action = SetFilter | SetQuery | ClearQuery;

const setFilter = (status: Status): SetFilter => ({
  type: 'filter/setFilter',
  payload: status,
});

const setQuery = (query: string): SetQuery => ({
  type: 'filter/setQuery',
  payload: query,
});

const clearQuery = (): ClearQuery => ({
  type: 'filter/clearQuery',
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
) => {
  switch (action.type) {
    case 'filter/setFilter':
      return { ...filter, status: action.payload };
    case 'filter/setQuery':
      return { ...filter, query: action.payload };
    case 'filter/clearQuery':
      return { ...filter, query: '' };
    default:
      return filter;
  }
};

export default filterReducer;
