import { Status } from '../types/Status';

type SetQueryAction = { type: 'query/SET', payload: string };
type ClearQueryAction = { type: 'query/CLEAR' };
type SetStatusAction = { type: 'status/SET', payload: Status };

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});
const setStatus = (status: Status): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});
const clearQuery = (): ClearQueryAction => ({
  type: 'query/CLEAR',
});

type Action = SetQueryAction | ClearQueryAction | SetStatusAction;

type State = {
  query: string;
  status: string;
};

const filterReducer = (
  state: State = {
    query: '',
    status: 'all',
  },
  action: Action,
): State => {
  switch (action.type) {
    case 'query/SET':
      return { ...state, query: action.payload };

    case 'query/CLEAR':
      return { ...state, query: '' };

    case 'status/SET':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export const actions = { setQuery, clearQuery, setStatus };
export default filterReducer;
