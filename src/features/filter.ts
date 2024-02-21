import { Status } from '../components/enums/Status';
import { Filters } from '../types/Filters';

type QueryAction = { type: 'filter/query'; payload: string };
type StatusAction = { type: 'filter/status'; payload: Status };
type Action = QueryAction | StatusAction;

const setQuery = (query: string): QueryAction => ({
  type: 'filter/query',
  payload: query,
});

const setStatus = (status: Status): StatusAction => ({
  type: 'filter/status',
  payload: status,
});

export const actions = {
  setQuery,
  setStatus,
};

const InitialFilters: Filters = {
  query: '',
  status: Status.All,
};

const filterReducer = (
  filters: Filters = InitialFilters,
  action: Action,
): Filters => {
  switch (action.type) {
    case 'filter/query':
      return { ...filters, query: action.payload };

    case 'filter/status':
      return { ...filters, status: action.payload };

    default:
      return filters;
  }
};

export default filterReducer;
