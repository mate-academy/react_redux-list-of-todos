import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

const setStatus = (filter: Status): SetStatusAction => {
  return {
    type: 'filter/SET_STATUS',
    payload: filter,
  };
};

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

const setQuery = (query: string): SetQueryAction => {
  return {
    type: 'filter/SET_QUERY',
    payload: query,
  };
};

type ClearQueryActions = {
  type: 'filter/CLEAR_QUERY';
};

const clearQuery = (): ClearQueryActions => {
  return {
    type: 'filter/CLEAR_QUERY',
  };
};

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

type Action = SetStatusAction | SetQueryAction | ClearQueryActions;

const filterReducer = (state: State = initialState, action: Action): State => {
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

    case 'filter/CLEAR_QUERY':
      return {
        ...state,
        query: '',
      };
    default:
      return state;
  }
};

export const actions = { setStatus, setQuery, clearQuery };

export default filterReducer;
