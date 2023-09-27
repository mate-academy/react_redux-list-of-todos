import { Status } from '../types/Status';

const SET_STATUS = 'filter/SET_STATUS';
const SET_QUERY = 'filter/SET_QUERY';

type SetStatus = {
  type: typeof SET_STATUS,
  payload: Status,
};

const setStatus = (status: Status): SetStatus => {
  return {
    type: SET_STATUS,
    payload: status,
  };
};

type SetQuery = {
  type: typeof SET_QUERY,
  payload: string,
};

const setQuery = (query: string): SetQuery => {
  return {
    type: SET_QUERY,
    payload: query,
  };
};

export const actions = { setStatus, setQuery };

const initialState: FilterState = {
  query: '',
  status: Status.All,
};

type FilterState = {
  query: string,
  status: Status,
};
type Action = SetStatus | SetQuery;

const filterReducer = (state = initialState, action: Action): FilterState => {
  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
