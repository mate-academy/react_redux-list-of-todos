import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'query/SET';
  payload: string;
};

type SetStatusAction = { type: 'status/SET'; payload: Status };

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});

export const actions = {
  setQuery,
  setStatus,
};

type State = { query: string; status: Status };
type Action = SetQueryAction | SetStatusAction;

const defaultState = {
  query: '',
  status: 'all' as Status,
};

const filterReducer = (
  state: State = defaultState,
  action: Action = {} as Action,
): State => {
  switch (action.type) {
    case 'query/SET':
      return { ...state, query: action.payload };

    case 'status/SET':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
