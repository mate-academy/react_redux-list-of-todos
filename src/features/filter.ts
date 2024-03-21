import { Status } from '../types/Status';

type SetStatusAction = { type: 'filter/SET_STATUS'; payload: Status };
type SetQueryAction = { type: 'filter/SET_QUERY'; payload: string };
type ClearQueryAction = { type: 'filter/CLEAR_QUERY' };

type Action = SetStatusAction | SetQueryAction | ClearQueryAction;

const setStatus = (value: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: value,
});
const setQuery = (value: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: value,
});
const clearQuery = (): ClearQueryAction => ({ type: 'filter/CLEAR_QUERY' });

export const actions = {
  setStatus,
  setQuery,
  clearQuery,
};

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/CLEAR_QUERY':
      return { ...state, query: '' };

    default:
      return state;
  }
};

export default filterReducer;
