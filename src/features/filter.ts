/* eslint-disable @typescript-eslint/default-param-last */
import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'query/SET';
  payload: string;
};

type RemoveQueryAction = {
  type: 'query/REMOVE';
};

type SetStatusAction = {
  type: 'status/SET';
  payload: Status;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

const clearQuery = (): RemoveQueryAction => ({
  type: 'query/REMOVE',
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});

export const actions = {
  setQuery,
  clearQuery,
  setStatus,
};

type Filter = {
  query: string;
  status: Status;
};

type Action = SetQueryAction | RemoveQueryAction | SetStatusAction;

const startedFilters: Filter = { query: '', status: 'all' };

const filterReducer = (state = startedFilters, action: Action): Filter => {
  switch (action.type) {
    case 'query/SET':
      return { ...state, query: action.payload };

    case 'query/REMOVE':
      return { ...state, query: '' };

    case 'status/SET':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
