import { Status } from '../types/Status';

type SetStatus = { type: 'status/SET', payload: Status };
type SetQuery = { type: 'query/SET', payload: string };

const setStatus = (status: Status): SetStatus => ({
  type: 'status/SET',
  payload: status,
});

const setQuery = (query: string): SetQuery => ({
  type: 'query/SET',
  payload: query,
});

type Action = SetStatus | SetQuery;

export const actions = { setStatus, setQuery };

type Filter = {
  status: Status,
  query: string,
};

const initialState: Filter = {
  status: 'all',
  query: '',
};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'status/SET': {
      return { ...state, status: action.payload };
    }

    case 'query/SET': {
      return { ...state, query: action.payload };
    }

    default:
      return state;
  }
};

export default filterReducer;
