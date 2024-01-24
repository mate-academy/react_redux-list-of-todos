import { Status } from '../types/Status';

type SetStatus = { type: 'status/SET'; payload: Status };
type SetQuery = { type: 'query/SET'; payload: string };

type Action = SetStatus | SetQuery;

const setStatus = (value: Status): SetStatus => ({
  type: 'status/SET',
  payload: value,
});

const setQuery = (value: string): SetQuery => ({
  type: 'query/SET',
  payload: value,
});

export const actions = { setStatus, setQuery };

const initialState: { query: string; status: Status } = {
  query: '',
  status: Status.All,
};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'query/SET':
      return { ...state, query: action.payload };

    case 'status/SET':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
