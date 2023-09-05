import { Status } from '../types/Status';

type FilterByStatus = {
  type: 'filter/STATUS',
  payload: Status
};

type FilterByQuery = {
  type: 'filter/QUERY',
  payload: string
};

interface Filter {
  status: Status,
  query: string,
}

type Action = FilterByStatus | FilterByQuery;

const filterByStatus = (payload: Status): FilterByStatus => (
  { type: 'filter/STATUS', payload }
);
const filterByQuery = (payload: string): FilterByQuery => (
  { type: 'filter/QUERY', payload }
);

export const actions = {
  filterByStatus,
  filterByQuery,
};

const defaultState = {
  status: Status.all,
  query: '',
};

const filterReducer = (state = defaultState, action: Action): Filter => {
  switch (action.type) {
    case 'filter/STATUS':
      return { ...state, status: action.payload };
    case 'filter/QUERY':
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
