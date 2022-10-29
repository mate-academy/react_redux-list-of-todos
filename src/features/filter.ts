type SetStatusAction = {
  type: 'status/SET';
  payload: string;
};

type SetQueryAction = {
  type: 'query/SET';
  payload: string;
};

const setStatus = (status: string): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

export const actions = { setStatus, setQuery };

export type FilterState = {
  status: string;
  query: string;
};
type Action = SetStatusAction | SetQueryAction;

const filterReducer = (
  state: FilterState = { status: 'all', query: '' },
  action: Action,
) => {
  switch (action.type) {
    case 'status/SET':
      return {
        ...state,
        status: action.payload,
      };

    case 'query/SET':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
