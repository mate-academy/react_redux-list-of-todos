type SetQueryAction = { type: 'filter/SET_QUERY', payload: string };
type SetStatusAction = { type: 'filter/SET_STATUS', payload: string };
type SetClearAction = { type: 'filter/SET_CLEAR' };
type Action = SetQueryAction | SetStatusAction | SetClearAction;

const setQuery = (value: string): SetQueryAction => (
  { type: 'filter/SET_QUERY', payload: value }
);
const setStatus = (value: string): SetStatusAction => (
  { type: 'filter/SET_STATUS', payload: value }
);
const removeQuery = (): SetClearAction => (
  { type: 'filter/SET_CLEAR' }
);

export const actions = { setQuery, setStatus, removeQuery };

const filterReducer = (
  queryParams = { query: '', status: 'all' },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return {
        ...queryParams,
        query: action.payload,
      };

    case 'filter/SET_STATUS':
      return {
        ...queryParams,
        status: action.payload,
      };

    case 'filter/SET_CLEAR':
      return {
        ...queryParams,
        query: '',
      };

    default:
      return queryParams;
  }
};

export default filterReducer;
