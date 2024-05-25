import { Status } from '../types/Status';

type SetStatus = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

type SetQuery = {
  type: 'filter/SET_QUERY';
  payload: string;
};

const setStatus = (status: Status): SetStatus => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const setQuery = (value: string): SetQuery => ({
  type: 'filter/SET_QUERY',
  payload: value,
});

export const actions = { setQuery, setStatus };

type Action = SetStatus | SetQuery;

type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state: FilterState = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };
    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    default:
      return initialState;
  }
};

export default filterReducer;
