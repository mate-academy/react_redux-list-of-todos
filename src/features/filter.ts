import { Filter } from '../types/Filter';

type FilterQuery = {
  type: 'filter/QUERY',
  payload: string,
};

type FilterStatus = {
  type: 'filter/STATUS',
  payload: Filter,
};

const filterByQuery = (query: string): FilterQuery => ({
  type: 'filter/QUERY',
  payload: query,
});

const filterByStatus = (status: Filter): FilterStatus => ({
  type: 'filter/STATUS',
  payload: status,
});

export const actions = {
  filterByQuery,
  filterByStatus,
};

type Action = FilterQuery | FilterStatus;

type State = {
  query: string,
  status: Filter,
};

const initState: State = {
  query: '',
  status: Filter.all,
};

const filterReducer = (
  state: State = initState,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/QUERY':
      return { ...state, query: action.payload };
    case 'filter/STATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
