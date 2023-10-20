// /* eslint-disable no-param-reassign */
type SetFilterQuery = {
  type: 'currentTodo/SET_QUERY',
  payload: string,
};

const setFilterQuery = (query: string): SetFilterQuery => ({
  type: 'currentTodo/SET_QUERY',
  payload: query,
});

export enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

type SetFilterAction =
  | { type: 'filter/SET_FILTER'; payload: Filter }
  | { type: 'currentTodo/SET_QUERY'; payload: string };

const setStatus = (filter: Filter): SetFilterAction => ({
  type: 'filter/SET_FILTER',
  payload: filter,
});

const initialState = {
  query: '',
  status: Filter.ALL,
};

export const filterActions = {
  setStatus,
  setFilterQuery,
};

const filterReducer = (state = initialState, action: SetFilterAction) => {
  switch (action.type) {
    case 'currentTodo/SET_QUERY':
      return { ...state, query: action.payload };
    case 'filter/SET_FILTER':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
