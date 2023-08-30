import { Status } from '../types/Status';

type SetQuery = { type: 'filter/QUERY', payload: string };
type SetStatus = { type: 'filter/STATUS', payload: Status };

const setQuery = (query: string): SetQuery => ({
  type: 'filter/QUERY',
  payload: query,
});
const setStatus = (status: Status): SetStatus => ({
  type: 'filter/STATUS',
  payload: status,
});

export const actions = { setQuery, setStatus };

type Filter = {
  query: string,
  status: Status,
};
type Action = SetQuery | SetStatus;

const DefaultState: Filter = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: Filter = DefaultState,
  action: Action,
): Filter => {
  switch (action.type) {
    case 'filter/QUERY':
      return { ...state, query: action.payload };

    case 'filter/STATUS':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
