import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

type ClearQueryAction = {
  type: 'filter/CLEAR_QUERY';
};

const clearQuery = (): ClearQueryAction => ({
  type: 'filter/CLEAR_QUERY',
});

export const actions = { setStatus, setQuery, clearQuery };

type Action = SetStatusAction | SetQueryAction | ClearQueryAction;
type State = {
  query: string,
  status: Status,
};

const filterReducer = (
  state: State = {
    query: '',
    status: 'all',
  },
  action: Action,
): State => {
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

export default filterReducer;
