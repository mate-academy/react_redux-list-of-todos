type SetStatus = {
  type: 'filter/SET_STATUS',
  payload: string,
};

type SetQuery = {
  type: 'filter/SET_QUERY',
  payload: string,
};

type Clear = {
  type: 'filter/CLEAR',
};

const setStatus = (status: string): SetStatus => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const setQuery = (query: string): SetQuery => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const clear = (): Clear => ({
  type: 'filter/CLEAR',
});

type State = {
  status: string,
  query: string,
};

const initialState: State = { status: 'all', query: '' };

type Action = SetStatus | SetQuery | Clear;

const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };
    case 'filter/CLEAR':
      return { ...state, query: '' };
    default:
      return state;
  }
};

export const filterActions = {
  setStatus,
  setQuery,
  remove: clear,
};
export default filterReducer;
