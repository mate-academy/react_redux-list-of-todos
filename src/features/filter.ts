import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'query/SET';
  payload: string;
};

type SetStatusAction = {
  type: 'status/SET';
  payload: Status;
};

const setQuery = (payload: string): SetQueryAction => ({
  type: 'query/SET',
  payload,
});

const setStatus = (payload: Status): SetStatusAction => ({
  type: 'status/SET',
  payload,
});

export const actions = { setQuery, setStatus };

type State = {
  query: string;
  status: Status;
} | null;

const InitialState = { query: '', status: 'all' } as State;

type Action = SetQueryAction | SetStatusAction;

const filterReducer = (
  state: State = InitialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'status/SET':
      return {
        ...state,
        status: action.payload,
      } as State;
    case 'query/SET':
      return {
        ...state,
        query: action.payload,
      } as State;
    default:
      return state;
  }
};

export default filterReducer;
