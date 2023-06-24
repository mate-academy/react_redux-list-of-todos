import { Status } from '../types/Status';

type SetStatus = {
  type: 'status/CHANGE';
  payload: string;
};

type SetQuery = {
  type: 'query/CHANGE';
  payload: string;
};

const setQuery = (query: string): SetQuery => ({
  type: 'query/CHANGE',
  payload: query,
});

const setStatus = (status: Status): SetStatus => ({
  type: 'status/CHANGE',
  payload: status,
});

export const actions = { setQuery, setStatus };

type Action = SetStatus | SetQuery;

type FilterState = {
  query: string,
  status: Status,
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

const filterReducer = (state: FilterState = initialState, action: Action) => {
  switch (action.type) {
    case 'status/CHANGE':
      return { ...state, status: action.payload };
    case 'query/CHANGE':
      return { ...state, query: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
