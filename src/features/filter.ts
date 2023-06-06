import { Status } from '../types/Status';

type SetQueryAction = { type: 'query/SET_QUERY'; payload: string };
type SetStatusAction = { type: 'status/SET_STATUS'; payload: Status };

type Action = SetQueryAction | SetStatusAction;

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET_QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'status/SET_STATUS',
  payload: status,
});

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

export const actions = { setQuery, setStatus };

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'query/SET_QUERY':
      return { ...state, query: action.payload };
    case 'status/SET_STATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
