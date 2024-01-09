import { Status } from '../types/Status';

type FilterAll = { type: 'filter/all'; payload: string };
type FilterActive = { type: 'filter/active'; payload: string };
type FilterCompleted = { type: 'filter/completed'; payload: string };
type FilterQuery = { type: 'filter/query'; payload: string };

type Action = FilterAll | FilterActive | FilterCompleted | FilterQuery;

export const setFilter = (filter: Status): Action => ({
  type: `filter/${filter}` as const,
  payload: filter,
});

export const setQuery = (filter: string): Action => ({
  type: 'filter/query',
  payload: filter,
});

const startFilter = { filterStatus: 'all', query: '' };

const filterReducer = (filter = startFilter, action: Action) => {
  switch (action.type) {
    case 'filter/all':
    case 'filter/active':
    case 'filter/completed':
      return { ...filter, filterStatus: action.payload };
    case 'filter/query':
      return { ...filter, query: action.payload };
    default:
      return startFilter;
  }
};

export default filterReducer;
export const actions = { setFilter, setQuery };
