import { Status } from '../types/Status';

type SetQueryAction = { type: 'filter/SET_QUERY'; payload: string };
type ClearQueryAction = { type: 'filter/CLEAR_QUERY' };
type SetStatusAction = { type: 'filter/SET_STATUS'; payload: Status };

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const clearQuery = (): ClearQueryAction => ({
  type: 'filter/CLEAR_QUERY',
});

export const actions = {
  setQuery,
  clearQuery,
  setStatus,
};

type Action = SetQueryAction | ClearQueryAction | SetStatusAction;

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/CLEAR_QUERY':
      return { ...state, query: '' };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
