export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type Filter = {
  status: Status,
  query: string,
};

type StatusAction = { type: 'filter/STATUS', payload: Status };
type QueryAction = { type: 'filter/QUERY', payload: string };

type Action = StatusAction | QueryAction;

const setStatus = (status: Status): StatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

const setQuery = (query: string): QueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

const filterReducer
  = (filter: Filter = { query: '', status: Status.All }, action: Action) => {
    switch (action.type) {
      case 'filter/STATUS':
        return {
          ...filter,
          status: action.payload,
        };

      case 'filter/QUERY':
        return {
          ...filter,
          query: action.payload,
        };

      default:
        return filter;
    }
  };

export default filterReducer;
export const actions = { setStatus, setQuery };
