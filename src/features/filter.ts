type SetQuery = {
  type: 'query/SET';
  payload: string
};

type SetStatus = {
  type: 'status/SET';
  payload: string
};

const setQuery = (query: string): SetQuery => (
  { type: 'query/SET', payload: query }
);

const setStatus = (status: string): SetStatus => (
  { type: 'status/SET', payload: status }
);

export const actions = {
  setQuery,
  setStatus,
};

type Action = SetQuery | SetStatus;

type State = {
  query: string
  status: string
};

const filterReducer = (
  state: State = { query: '', status: 'all' },
  action: Action,
): State => {
  switch (action.type) {
    case 'query/SET':
      return {
        ...state,
        query: action.payload,
      };

    case 'status/SET':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
