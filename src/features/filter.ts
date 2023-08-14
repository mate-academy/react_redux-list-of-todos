type SetFilters = {
  type: 'filters/set',
  filters: {
    query: string,
    status: string,
  }
};

type SetQuery = {
  type: 'filters/set/query',
  filters: {
    query: string,
  }
};

export type SetFilter = {
  type: 'filters/set/filter',
  filters: {
    status: string,
  }
};

const set = (newQuery: string, newStatus: string): SetFilters => ({
  type: 'filters/set',
  filters: {
    query: newQuery,
    status: newStatus,
  },
});

const setQuery = (newQuery: string): SetQuery => ({
  type: 'filters/set/query',
  filters: {
    query: newQuery,
  },
});

const setFilter = (newStatus: string): SetFilter => ({
  type: 'filters/set/filter',
  filters: {
    status: newStatus,
  },
});

type Actions = SetFilters | SetQuery | SetFilter;

export const actions = { set, setQuery, setFilter };

const initialState = {
  query: '',
  status: 'all',
};

const filterReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case 'filters/set':
      return {
        ...state,
        ...action.filters,
      };

    case 'filters/set/query':
      return {
        ...state,
        query: action.filters.query,
      };

    case 'filters/set/filter':
      return {
        ...state,
        status: action.filters.status,
      };

    default:
      return state;
  }
};

export default filterReducer;
