type SetQueryAction = { type: 'filter/SET_FILTER_QUERY', payload: string };
type RemoveQueryAction = {
  type: 'filter/SET_FILTER_REMOVE_QUERY'
};
type SetFilterStatus = { type: 'filter/SET_FILTER_STATUS', payload: string };

type Action = SetQueryAction | RemoveQueryAction | SetFilterStatus;

const setQuery = (query: string): Action => ({
  type: 'filter/SET_FILTER_QUERY',
  payload: query,
});

const removeQuery = (): Action => ({
  type: 'filter/SET_FILTER_REMOVE_QUERY',
});

const setStatus = (status: string): Action => ({
  type: 'filter/SET_FILTER_STATUS',
  payload: status,
});

export const actions = { setQuery, removeQuery, setStatus };

type Filter = {
  query: string;
  status: string;
};

const initialFilter: Filter = {
  query: '',
  status: 'all',
};

const filterReducer = (filter: Filter = initialFilter, action: Action) => {
  switch (action.type) {
    case 'filter/SET_FILTER_QUERY':
      return {
        ...filter,
        query: action.payload,
      };

    case 'filter/SET_FILTER_STATUS':
      return {
        ...filter,
        status: action.payload,
      };

    case 'filter/SET_FILTER_REMOVE_QUERY':
      return {
        query: '',
        status: filter.status,
      };

    default:
      return filter;
  }
};

export default filterReducer;
