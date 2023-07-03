type Filter = {
  type: 'filter/QUERY' | 'filter/STATUS'
  payload: string;
};

export const actions = {
  setQuery: (query: string): Filter => (
    { type: 'filter/QUERY', payload: query }
  ),
  setStatus: (status: string): Filter => (
    { type: 'filter/STATUS', payload: status }
  ),
};

const initialFilters = {
  query: '',
  status: 'all',
};

const filterReducer = (filters = initialFilters, action: Filter) => {
  switch (action.type) {
    case 'filter/QUERY':
      return { ...filters, query: action.payload };

    case 'filter/STATUS':
      return { ...filters, status: action.payload };

    default:
      return filters;
  }
};

export default filterReducer;
