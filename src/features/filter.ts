import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'query/SET',
  playload: string,
};

type SetStatusAction = {
  type: 'status/SET',
  playload: Status,
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  playload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'status/SET',
  playload: status,
});

export const actions = { setQuery, setStatus };

type State = { query: string, status: Status };
type Action = SetQueryAction | SetStatusAction ;

const filterReducer = (
  state: State = { query: '', status: 'all' },
  action: Action,
): State => {
  switch (action.type) {
    case 'query/SET':
      return { ...state, query: action.playload };
    case 'status/SET':
      return { ...state, status: action.playload };
    default:
      return state;
  }
};

export default filterReducer;
