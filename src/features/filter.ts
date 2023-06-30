import { Status } from '../types/Status';

type SetFilterQuery = {
  type: 'filterQuery/SET',
  payload: string,
};

type SetFilterStatus = {
  type: 'filterStatus/SET',
  payload: Status,
};

const setQuery = (query: string): SetFilterQuery => ({
  type: 'filterQuery/SET',
  payload: query,
});

const setFilter = (status: Status): SetFilterStatus => ({
  type: 'filterStatus/SET',
  payload: status,
});

type Action = SetFilterQuery | SetFilterStatus;

export const actions = {
  setQuery,
  setFilter,
};

export type State = {
  query: string,
  status: Status,
};

const filterReducer = (
  state: State = {
    query: '',
    status: 'all',
  },
  action: Action,
) => {
  switch (action.type) {
    case 'filterQuery/SET':
      return {
        ...state,
        query: action.payload,
      };

    case 'filterStatus/SET':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
