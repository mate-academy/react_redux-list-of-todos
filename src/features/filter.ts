import { Status } from '../types/Status';

export type FilterOptions = {
  query: string,
  status: Status | string,
};

type StatusAction = {
  type: 'status'
  payload: Status | string
};

type QueryAction = {
  type: 'query'
  payload: string
};

const filterByStatus = (status: Status | string): StatusAction => ({
  type: 'status',
  payload: status,
});

const filterByQuery = (query: string): QueryAction => ({
  type: 'query',
  payload: query,
});

const initFilter: FilterOptions = { query: '', status: Status.ALL };

const filterReducer = (
  filter = initFilter,
  action: StatusAction | QueryAction,
): FilterOptions => {
  switch (action.type) {
    case 'query':
      return {
        ...filter,
        query: action.payload,
      };

    case 'status':
      return {
        ...filter,
        status: action.payload,
      };

    default:
      return filter;
  }
};

export default filterReducer;

export const filterActions = { filterByStatus, filterByQuery };
