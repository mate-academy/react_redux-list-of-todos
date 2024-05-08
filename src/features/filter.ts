/* eslint-disable @typescript-eslint/default-param-last */
import { Status } from '../types/Status';

type SetQuery = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type ClearQuery = {
  type: 'filter/CLEAR';
};

type SetStatus = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

type Action = SetQuery | SetStatus | ClearQuery;

const setQuery = (query: string): SetQuery => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const clearQuery = (): ClearQuery => ({
  type: 'filter/CLEAR',
});

const setStatus = (status: Status): SetStatus => ({
  type: 'filter/SET_STATUS',
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

const initialState: Filter = {
  query: '',
  status: 'all',
};

const filterReducer = (
  status: Filter = initialState,
  action: Action,
): Filter => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...status, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...status, status: action.payload };

    case 'filter/CLEAR':
      return { ...status, query: '' };

    default:
      return status;
  }
};

export default filterReducer;
