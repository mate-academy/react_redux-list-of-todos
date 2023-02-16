type Filter = {
  query: string,
  status: string,
};

type FilterStatus = {
  type: 'filter/STATUS';
  payload: string,
};

type FilterQuery = {
  type: 'filter/QUERY';
  payload: string;
};

type FilterClear = { type: 'filter/CLEAR' };

type Action = FilterStatus
| FilterQuery
| FilterClear;

const filterStatus = (status: string): FilterStatus => ({
  type: 'filter/STATUS',
  payload: status,
});

const filterQuery = (query: string): FilterQuery => ({
  type: 'filter/QUERY',
  payload: query,
});

const filterClear = (): FilterClear => ({
  type: 'filter/CLEAR',
});

export const actions = { filterStatus, filterQuery, filterClear };

const filterReducer = (
  filter: Filter = { query: '', status: 'all' },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/STATUS':
      return { ...filter, status: action.payload };

    case 'filter/QUERY':
      return { ...filter, query: action.payload };

    case 'filter/CLEAR':
      return { ...filter, query: '' };

    default:
      return filter;
  }
};

export default filterReducer;
