type SetAllFilter = { type: 'filter/ALL' };
type SetActiveFilter = { type: 'filter/ACTIVE' };
type SetCompletedFilter = { type: 'filter/COMPLETED' };
type SetQuery = { type: 'query/SET', payload: string };
type RemoveQuery = { type: 'query/REMOVE' };

type Actions = SetAllFilter
| SetActiveFilter
| SetCompletedFilter
| SetQuery
| RemoveQuery;

const getAllTodos = (): SetAllFilter => (
  { type: 'filter/ALL' }
);

const getActiveTodos = (): SetActiveFilter => (
  { type: 'filter/ACTIVE' }
);

const getCompletedTodos = (): SetCompletedFilter => (
  { type: 'filter/COMPLETED' }
);

const setQuery = (query: string): SetQuery => (
  { type: 'query/SET', payload: query }
);

const removeQuery = (): RemoveQuery => (
  { type: 'query/REMOVE' }
);

export const actions = {
  getAllTodos,
  getActiveTodos,
  getCompletedTodos,
  setQuery,
  removeQuery,
};

const initialState = {
  query: '',
  status: 'all',
};

type State = {
  query: string,
  status: string,
};

const filterReducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case 'filter/ALL':
      return { ...state, status: 'all' };
    case 'filter/ACTIVE':
      return { ...state, status: 'active' };
    case 'filter/COMPLETED':
      return { ...state, status: 'completed' };
    case 'query/SET':
      return { ...state, query: action.payload };
    case 'query/REMOVE':
      return { ...state, query: '' };
    default:
      return state;
  }
};

export default filterReducer;
