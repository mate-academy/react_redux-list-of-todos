import { Status } from '../types/Status';

type FilterByAll = { type: 'filter/ALL' };
type FilterByActive = { type: 'filter/ACTIVE' };
type FilterByCompleted = { type: 'filter/COMPLETED' };
type FilterByQuery = { type: 'filter/QUERY', payload: string };

type Action = FilterByAll | FilterByActive | FilterByCompleted | FilterByQuery;

const filterAll = (): FilterByAll => ({ type: 'filter/ALL' });
const filterActive = (): FilterByActive => ({ type: 'filter/ACTIVE' });
const filterCompleted = (): FilterByCompleted => ({ type: 'filter/COMPLETED' });
const filterQuery = (value: string): FilterByQuery => ({
  type: 'filter/QUERY',
  payload: value,
});

export const actions = {
  filterAll, filterActive, filterCompleted, filterQuery,
};

type DefaultFilterType = { query: string, status: Status };

const defaultFilterParams = { query: '', status: 'all' as Status };

const filterReducer = (
  filter: DefaultFilterType = defaultFilterParams,
  action: Action,
): DefaultFilterType => {
  switch (action.type) {
    case 'filter/ALL':
      return { ...filter, status: 'all' };

    case 'filter/COMPLETED':
      return { ...filter, status: 'completed' };

    case 'filter/ACTIVE':
      return { ...filter, status: 'active' };

    case 'filter/QUERY':
      return { ...filter, query: action.payload };

    default:
      return filter;
  }
};

export default filterReducer;
