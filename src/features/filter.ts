import { Status } from '../types/Status';

/* eslint-disable @typescript-eslint/default-param-last */
type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
  query: '',
  status: Status.All,
};

type SetQueryAction = { type: 'filter/SET_QUERY'; payload: string };
type SetStatusAction = { type: 'filter/SET_STATUS'; payload: Status };

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

type Action = SetQueryAction | SetStatusAction;

export const actions = { setQuery, setStatus };

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
