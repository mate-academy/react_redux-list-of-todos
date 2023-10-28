import { Status } from '../types/Status';

type Filter = { query: string, status: Status };
type SetQueryAction = { type: 'filter/SET_QUERY', payload: string };
type ClearQueryAction = { type: 'filter/CLEAR_QUERY' };
type SetStatusAction = { type: 'filter/SET_STATUS', payload: Status };
type Action = SetQueryAction | SetStatusAction | ClearQueryAction;

export const actions = {
  setQuery: (query: string): SetQueryAction => ({
    type: 'filter/SET_QUERY',
    payload: query,
  }),
  clearQuery: (): ClearQueryAction => ({ type: 'filter/CLEAR_QUERY' }),
  setStatus: (status: Status): SetStatusAction => ({
    type: 'filter/SET_STATUS',
    payload: status,
  }),
};

const defaultFilter: Filter = { query: '', status: 'all' };

const filterReducer = (filter: Filter = defaultFilter, action: Action) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...filter, query: action.payload };
    case 'filter/CLEAR_QUERY':
      return { ...filter, query: '' };
    case 'filter/SET_STATUS':
      return { ...filter, status: action.payload };
    default:
      return filter;
  }
};

export default filterReducer;
