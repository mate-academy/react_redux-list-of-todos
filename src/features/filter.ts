type FilterQueryAction = { type: 'filter/QUERY', query: string };
type FilterStatusAction = { type: 'filter/STATUS', status: string };

type Action = FilterQueryAction | FilterStatusAction;

const setQueryFilter = (query: string): FilterQueryAction => ({
  type: 'filter/QUERY',
  query,
});
const setStatusFilter = (status: string): FilterStatusAction => ({
  type: 'filter/STATUS',
  status,
});

export const actions = { setQueryFilter, setStatusFilter };

const startFilters = { query: '', status: 'all' };

const filterReducer = (
  filters = startFilters,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/QUERY':
      return { ...filters, query: action.query };
    case 'filter/STATUS':
      return { ...filters, status: action.status };
    default:
      return filters;
  }
};

export default filterReducer;
