import { Status } from '../types/Status';

type SetQuery = {
  type: 'filter/query/SET';
  payload: string;
};

type ClearQuery = {
  type: 'filter/query/CLEAR';
};

type SetStatus = {
  type: 'filter/status/SET';
  payload: Status;
};

const setQuery = (input: string): SetQuery => ({
  type: 'filter/query/SET',
  payload: input,
});

const clearQuery = (): ClearQuery => ({ type: 'filter/query/CLEAR' });

const setStatus = (option: Status): SetStatus => ({
  type: 'filter/status/SET',
  payload: option,
});

export type State = {
  query: string;
  status: Status | null;
};

type Action = SetQuery | SetStatus | ClearQuery;

export const actions = { setQuery, setStatus, clearQuery };

const initialState: State = {
  query: '',
  status: null,
};

/* eslint-disable */
const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'filter/query/SET':
      return { ...state, query: action.payload };
    case 'filter/status/SET':
      return { ...state, status: action.payload };
    case 'filter/query/CLEAR':
      return { ...state, query: '' };
    default:
      return state;
  }
};

export default filterReducer;
