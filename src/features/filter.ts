type Status = 'all' | 'completed' | 'active';

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: {
    status: Status
  };
};

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: {
    query: string
  };
};

const setStatus = (status: Status): SetStatusAction => (
  {
    type: 'filter/SET_STATUS',
    payload: {
      status,
    },
  }
);

const setQuery = (query: string): SetQueryAction => (
  {
    type: 'filter/SET_QUERY',
    payload: {
      query,
    },
  }
);

type Action = SetStatusAction | SetQueryAction;

export type Filter = {
  query: string;
  status: Status;
};

export const actions = { setStatus, setQuery };

const filterReducer = (
  filter: Filter = {
    query: '',
    status: 'all',
  },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return { ...filter, status: action.payload.status };
    case 'filter/SET_QUERY':
      return { ...filter, query: action.payload.query };
    default:
      return filter;
  }
};

export default filterReducer;
