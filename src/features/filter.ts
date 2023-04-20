export enum FilterTodoStatus {
  ALL = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}

type SetQuery = { type: 'filter/QUERY', payload: string };
type ClearQuery = { type: 'filter/CLEAR_QUERY' };
type SetFilterTodoStatus = { type: 'filter/STATUS', payload: FilterTodoStatus };

const setQuery = (query: string): SetQuery => (
  { type: 'filter/QUERY', payload: query }
);
const clearQuery = (): ClearQuery => (
  { type: 'filter/CLEAR_QUERY' }
);
const setTodoFilterStatus = (
  status: FilterTodoStatus,
): SetFilterTodoStatus => ({
  type: 'filter/STATUS',
  payload: status,
});

export const filterActions = { setQuery, setTodoFilterStatus, clearQuery };

type State = { query: string, status: FilterTodoStatus };
type Action = SetQuery | SetFilterTodoStatus | ClearQuery;

const filterReducer = (
  state: State = { query: '', status: FilterTodoStatus.ALL },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/QUERY':
      return { ...state, query: action.payload };
    case 'filter/STATUS':
      return { ...state, status: action.payload };
    case 'filter/CLEAR_QUERY':
      return { ...state, query: '' };
    default:
      return state;
  }
};

export default filterReducer;
