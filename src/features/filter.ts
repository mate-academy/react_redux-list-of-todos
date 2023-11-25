import { Status } from '../types/Status';

type SetStatus = { type: 'filter/STATUS', payload: Status };
type SetQuery = { type: 'filter/QUERY', payload: string };
type ResetQuery = { type: 'filter/RESET_QUERY' };

type State = {
  query: string,
  status: Status
};

const setStatus = (status: Status): SetStatus => ({
  type: 'filter/STATUS',
  payload: status,
});

const setQuery = (query: string): SetQuery => ({
  type: 'filter/QUERY',
  payload: query,
});

const resetQuery = (): ResetQuery => ({
  type: 'filter/RESET_QUERY',
});

type Action = SetStatus | SetQuery | ResetQuery;

const filterReducer = (
  state: State = { query: '', status: 'all' },
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/STATUS':
      return { ...state, status: action.payload };

    case 'filter/QUERY':
      return { ...state, query: action.payload };

    case 'filter/RESET_QUERY':
      return { ...state, query: '' };

    default:
      return state;
  }
};

export default filterReducer;
export const actions = { setStatus, setQuery, resetQuery };
