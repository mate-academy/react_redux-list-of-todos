import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'query/SET_QUERY';
  payload: string;
};

type SetStatusAction = {
  type: 'query/SET_STATUS';
  payload: Status;
};

type State = {
  query: string;
  status: Status;
};

type Action = SetQueryAction | SetStatusAction;

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET_QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'query/SET_STATUS',
  payload: status,
});

export const actions = {
  setQuery,
  setStatus,
};

const defaultState: State = {
  query: '',
  status: 'all',
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case 'query/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'query/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
