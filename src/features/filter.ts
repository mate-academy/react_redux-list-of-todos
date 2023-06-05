import { Status } from '../types/Status';

type SetFilterQuery = {
  type: 'filterQuery/SET';
  payload: string;
};

type SetFilterStatus = {
  type: 'filterStatus/SET';
  payload: Status;
};

const setQuery = (query: string): SetFilterQuery => ({
  type: 'filterQuery/SET',
  payload: query,
});

const setStatus = (status: Status): SetFilterStatus => ({
  type: 'filterStatus/SET',
  payload: status,
});

export const actions = {
  setQuery,
  setStatus,
};

type Action = SetFilterQuery | SetFilterStatus;
export type State = {
  query: string,
  status: Status
};

const filterReducer = (
  state: State = {
    query: '',
    status: 'all',
  },
  action: Action,
) => {
  switch (action.type) {
    case 'filterStatus/SET':
      return {
        ...state,
        status: action.payload,
      };
    case 'filterQuery/SET':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
