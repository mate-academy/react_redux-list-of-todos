type Status = 'all' | 'active' | 'completed';

type SetQueryAction = { type: 'filter/SET_QUERY', payload: string };
type SetStatusAction = { type: 'filter/SET_STATUS', payload: Status };

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = {
  setQuery,
  setStatus,
};

export type FilterState = {
  query: string
  status: Status
};

type Action = SetQueryAction | SetStatusAction;

const initialState: FilterState = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: FilterState = initialState,
  action: Action,
): FilterState => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
