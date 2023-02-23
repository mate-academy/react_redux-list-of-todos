type SetQueryAction = {
  type: 'query/SET';
  payload: string;
};

type SetStatusAction = {
  type: 'status/SET';
  payload: string;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

const setStatus = (status: string): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});

export const actions = { setQuery, setStatus };

type State = {
  query: string,
  status: string,
};
type Action = SetQueryAction | SetStatusAction;

const defaultFilters: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: State = defaultFilters,
  action: Action,
) => {
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
