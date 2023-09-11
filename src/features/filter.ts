import { Status } from '../types/Status';

type SetStatus = {
  type: 'filter/SET_STATUS',
  payload: Status,
};

const setStatus = (status: Status): SetStatus => {
  return {
    type: 'filter/SET_STATUS',
    payload: status,
  };
};

type SetQuery = {
  type: 'filter/SET_QUERY',
  payload: string,
};

const setQuery = (query: string): SetQuery => {
  return {
    type: 'filter/SET_QUERY',
    payload: query,
  };
};

export const actions = { setStatus, setQuery };

const initialState = {
  query: '',
  status: 'all' as Status,
};

type InitialState = {
  query: string,
  status: Status,
};
type Action = SetStatus | SetQuery;

const filterReducer = (state = initialState, action: Action): InitialState => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
