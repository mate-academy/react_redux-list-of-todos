import { Status } from '../types/Status';

type StatusType = {
  type: 'filter/STATUS';
  payload: Status;
};

const status = (value: Status): StatusType => ({
  type: 'filter/STATUS',
  payload: value,
});

type QueryType = {
  type: 'filter/QUERY';
  payload: string;
};

const query = (value: string): QueryType => ({
  type: 'filter/QUERY',
  payload: value,
});

export const actions = {
  status,
  query,
};

type State = {
  status: Status;
  query: string;
};

const startState: State = {
  status: Status.ALL,
  query: '',
};

type Action = StatusType | QueryType;

const filterReducer = (filters: State = startState, action: Action): State => {
  switch (action.type) {
    case 'filter/STATUS':
      return { ...filters, status: action.payload };
    case 'filter/QUERY':
      return { ...filters, query: action.payload };
    default:
      return filters;
  }
};

export default filterReducer;
