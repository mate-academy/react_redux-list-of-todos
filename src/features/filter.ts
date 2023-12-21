import { Status } from '../types/Status';

type SetQuery = { type: 'query/SET', payload: string };
type ClearQuery = { type: 'query/ClEAR' };
type SetStatus = { type: 'status/SET', payload: Status };

type Action = SetQuery | ClearQuery | SetStatus;

const setQuery = (value: string): SetQuery => (
  { type: 'query/SET', payload: value }
);

const clearQuery = (): ClearQuery => (
  { type: 'query/ClEAR' }
);

const setStatus = (value: Status): SetStatus => (
  { type: 'status/SET', payload: value }
);

type Filter = { query: string, status: Status };

const filterState: Filter = {
  query: '',
  status: Status.All,
};

const filterReducer = (state = filterState, action: Action) => {
  switch (action.type) {
    case 'query/SET':
      return { ...state, query: action.payload };

    case 'query/ClEAR':
      return { ...state };

    case 'status/SET':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export const actions = { setQuery, clearQuery, setStatus };

export default filterReducer;
