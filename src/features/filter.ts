/* eslint-disable @typescript-eslint/default-param-last */

import { Status } from '../types/Status';

type QueryFilter = {
  type: 'filter/QUERY';
  payload: string;
};

type StatusFilter = {
  type: 'filter/STATUS';
  payload: Status;
};

type ClearQueryFilter = { type: 'filter/CLEAR' };

const query = (value: string): QueryFilter => ({
  type: 'filter/QUERY',
  payload: value,
});

const status = (s: Status): StatusFilter => ({
  type: 'filter/STATUS',
  payload: s,
});

const clear = (): ClearQueryFilter => ({ type: 'filter/CLEAR' });

export const actions = {
  query,
  status,
  clear,
};

type Actions = StatusFilter | QueryFilter | ClearQueryFilter;

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case 'filter/STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/CLEAR':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default filterReducer;
