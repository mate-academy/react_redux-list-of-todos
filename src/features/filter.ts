/* eslint-disable @typescript-eslint/default-param-last */
import { Status } from '../types/Status';

type Action = {
  type: Status;
  payload: string;
};
type Filter = { status: Status; query: string };

const filterActive = (query: string): Action => ({
  type: 'active',
  payload: query,
});
const filterCompleted = (query: string): Action => ({
  type: 'completed',
  payload: query,
});
const filterAll = (query: string): Action => ({
  type: 'all',
  payload: query,
});

const applyFilter = (status: Status, query: string): Action => ({
  type: status,
  payload: query,
});

const initialFilter: Filter = { status: 'all', query: '' };

const filterReducer = (filter: Filter = initialFilter, action: Action) => {
  switch (action.type) {
    case 'active':
    case 'completed':
    case 'all':
      return {
        status: action.type,
        query: action.payload,
      };
    default:
      return filter;
  }
};

const actions = { filterActive, filterCompleted, filterAll, applyFilter };

export { filterReducer, actions };
