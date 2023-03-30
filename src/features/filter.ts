import { Status } from '../types/Status';

type SetStatusAction = { type: 'STATUS/SET', payload: Status };
type SetQueryAction = { type: 'QUERY/SET', payload: string };

const setStatus = (statusType: Status):SetStatusAction => {
  return { type: 'STATUS/SET', payload: statusType };
};

const setQuery = (search: string):SetQueryAction => {
  return { type: 'QUERY/SET', payload: search };
};

type State = { query: string, status: string };
type Action = SetStatusAction | SetQueryAction;

export const actions = { setStatus, setQuery };

const filterReducer = (
  state: State = { query: '', status: 'all' },
  action: Action,
) => {
  switch (action.type) {
    case 'STATUS/SET':
      return { ...state, status: action.payload };
    case 'QUERY/SET':
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
