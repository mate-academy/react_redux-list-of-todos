type FilterQueryAction = { type: 'filter/SET_QUERY', payload: string };
type FilterSelectAction = { type: 'filter/SET_SELECT', payload: string };

const setQuery = (query: string): FilterQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setSelect = (select: string): FilterSelectAction => ({
  type: 'filter/SET_SELECT',
  payload: select,
});

export const actions = { setQuery, setSelect };

type Action = FilterQueryAction | FilterSelectAction;

export type State = {
  query: string,
  select: 'all',
};

const defaultState: State = {
  query: '',
  select: 'all',
};

const filterReducer = (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };
    case 'filter/SET_SELECT':
      return { ...state, select: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
