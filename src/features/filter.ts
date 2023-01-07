import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/SET-QUERY';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/SET-STATUS';
  payload: Status;
};

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

type Action = SetQueryAction | SetStatusAction;

const setQuery = (query: string): SetQueryAction => {
  return {
    type: 'filter/SET-QUERY',
    payload: query,
  };
};

const setStatus = (status: Status): SetStatusAction => {
  return {
    type: 'filter/SET-STATUS',
    payload: status,
  };
};

export const actions = { setQuery, setStatus };

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET-QUERY':
      return { ...state, query: action.payload };

    case 'filter/SET-STATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
