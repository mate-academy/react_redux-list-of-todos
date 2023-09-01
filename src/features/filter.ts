export enum TodoStatus {
  COMPLETED = 'completed',
  ACTIVE = 'active',
  ALL = 'all',
}

interface SetStatusFilter {
  type: 'filter/STATUS',
  payload: TodoStatus,
}

interface SetSearchQueryFilter {
  type: 'filter/SEARCH_QUERY',
  payload: string,
}

interface Filter {
  query: string,
  status: TodoStatus,
}

type Action = SetStatusFilter | SetSearchQueryFilter;

const filterByStatus = (status: TodoStatus): SetStatusFilter => (
  { type: 'filter/STATUS', payload: status }
);

const filterBySearchQuery = (query: string): SetSearchQueryFilter => (
  { type: 'filter/SEARCH_QUERY', payload: query }
);

export const actions = { filterByStatus, filterBySearchQuery };

const defaultParams: Filter = {
  query: '',
  status: TodoStatus.ALL,
};

const filterReducer = (
  params = defaultParams,
  action: Action,
): Filter => {
  switch (action.type) {
    case 'filter/STATUS': {
      return {
        ...params,
        status: action.payload,
      };
    }

    case 'filter/SEARCH_QUERY': {
      return {
        ...params,
        query: action.payload,
      };
    }

    default:
      return params;
  }
};

export default filterReducer;
