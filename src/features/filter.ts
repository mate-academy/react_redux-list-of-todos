import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

const setStatus = (value: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: value,
});

const setQuery = (value: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: value,
});

export type State = { query: string, status: Status };
type Action = SetStatusAction | SetQueryAction;
export const actions = { setStatus, setQuery };

const filterReducer = (
  state: State = {
    query: '',
    status: 'all',
  },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };
    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
