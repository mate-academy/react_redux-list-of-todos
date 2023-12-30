export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type SetStatusAction = {
  type: 'filter/STATUS';
  payload: Status;
};

type SetQueryAction = {
  type: 'filter/QUERY';
  payload: string;
};

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

export const actions = { setStatus, setQuery };

type Action = SetStatusAction | SetQueryAction;

type Filter = {
  query: string,
  status: Status,
};

const filterReducer = (
  filter: Filter = {
    query: '',
    status: Status.All,
  },
  action: Action,
) => {
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
