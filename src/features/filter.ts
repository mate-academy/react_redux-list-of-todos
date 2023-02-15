type Filter = {
  query: string,
  status: string,
};

type FilterStatus = {
  type: 'filter/STATUS';
  query: string;
  status: string,
};
type FilterQuery = {
  type: 'filter/QUERY';
  query: string;
  status: string,
};
type FilterClear = {
  type: 'filter/CLEAR';
  query: string;
  status: string,
};

type Action = FilterStatus
| FilterQuery
| FilterClear;

const filterStatus = (status: string, query = ''): FilterStatus => ({
  type: 'filter/STATUS',
  query,
  status,
});
const filterQuery = (query: string, status = 'all'): FilterQuery => ({
  type: 'filter/QUERY',
  query,
  status,
});

const filterClear = (status = 'all', query = ''): FilterClear => ({
  type: 'filter/CLEAR',
  query,
  status,
});

export const actions = { filterStatus, filterQuery, filterClear };

const filterReducer = (
  filter: Filter = { query: '', status: 'all' },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/STATUS':
      return { ...filter, status: action.status };

    case 'filter/QUERY':
      return { ...filter, query: action.query };

    case 'filter/CLEAR':
      return { ...filter, query: '' };

    default:
      return filter;
  }
};

export default filterReducer;
