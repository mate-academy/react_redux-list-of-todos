import { Status } from '../types/Status';

type SetQuery = { type: 'filter/SET_QUERY', payload: string };
type SetStatus = { type: 'filter/SET_STATUS', payload: Status };

const setQuery = (query: string): SetQuery => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatus => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = { setQuery, setStatus };

type Action = SetQuery | SetStatus;
const initialState = { query: '', status: 'all' };

const filterReducer = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
