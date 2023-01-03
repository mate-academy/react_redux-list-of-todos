import type { RootState } from '../app/store';
import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/query/SET',
  payload: string,
};

type SetStatusAction = {
  type: 'filter/status/SET',
  payload: Status,
};

const setQuery = (title: string): SetQueryAction => ({
  type: 'filter/query/SET',
  payload: title,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/status/SET',
  payload: status,
});

type Action = SetQueryAction | SetStatusAction;

type State = {
  query: string,
  status: Status,
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/query/SET':
      return { ...state, query: action.payload };

    case 'filter/status/SET':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export const actions = { setQuery, setStatus };
export const selectors = {
  getQuery: (state: RootState) => state.filter.query,
  getStatus: (state: RootState) => state.filter.status,
};

export default filterReducer;
