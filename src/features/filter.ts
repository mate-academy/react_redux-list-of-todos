import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/SET-QUERY',
  payload: string,
};

type ClearQueryAction = {
  type: 'filter/CLEAR-QUERY',
};

type SetStatusAction = {
  type: 'filter/SET-STATUS',
  payload: Status,
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET-QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET-STATUS',
  payload: status,
});

const clearQuery = (): ClearQueryAction => ({
  type: 'filter/CLEAR-QUERY',
});

export const actions = { setQuery, setStatus, clearQuery };

type State = { query: string, status: Status };
type Action = SetQueryAction | SetStatusAction | ClearQueryAction;

const filterReducer = (
  state: State = {
    query: '',
    status: 'all',
  },
  action: Action,
):State => {
  switch (action.type) {
    case 'filter/SET-QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/SET-STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/CLEAR-QUERY':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default filterReducer;
