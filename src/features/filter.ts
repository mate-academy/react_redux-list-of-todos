import { Status } from '../types/Status';

type SetQuery = { type: 'filter/SET_QUERY', payload: string };
type RemoveQuery = { type: 'filter/REMOVE_QUERY' };
type SetStatus = { type: 'filter/SET_STATUS', payload: Status };

const setQuery = (query: string): SetQuery => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const removeQuery = (): RemoveQuery => ({ type: 'filter/REMOVE_QUERY' });

const setStatus = (status: Status): SetStatus => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = { setQuery, removeQuery, setStatus };

type Action = SetQuery | RemoveQuery | SetStatus;

const filterReducer = (
  query = '',
  status: Status = 'all',
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { query: action.payload, status };

    case 'filter/REMOVE_QUERY':
      return { query: '', status };

    case 'filter/SET_STATUS':
      return { query, status: action.payload };

    default:
      return { query: '', status: 'all' };
  }
};

export default filterReducer;
