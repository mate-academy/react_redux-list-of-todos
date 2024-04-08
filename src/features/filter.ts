/* eslint-disable @typescript-eslint/default-param-last */
import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'status/SET';
  payload: Status;
};

type SetQueryAction = {
  type: 'query/SET';
  payload: string;
};

const setStatus = (status: Status): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

export const actions = {
  setStatus,
  setQuery,
};

type State = {
  query: string;
  status: Status;
};

const initialFilter: State = {
  query: '',
  status: Status.All,
};

type Action = SetStatusAction | SetQueryAction;

const filterReducer = (state: State = initialFilter, action: Action) => {
  switch (action.type) {
    case 'query/SET':
      return { ...state, query: action.payload };

    case 'status/SET':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
