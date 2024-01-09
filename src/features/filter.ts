import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'status/SET';
  payload: Status;
};

type SetQueryAction = {
  type: 'query/SET';
  payload: string;
};

const setStatus = (status: Status): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

export const actions = { setStatus, setQuery };

type State = { query: string, status: Status };
type Action = SetStatusAction | SetQueryAction;

const startFilter: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: State = startFilter,
  action: Action,
): State => {
  switch (action.type) {
    case 'query/SET':
      return {
        query: action.payload,
        status: state.status,
      };

    case 'status/SET':
      return {
        query: state.query,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
