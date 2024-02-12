import { State, Status } from '../types/Status';

type SelectTodos = { type: 'select/todos', payload: Status };
type QueryTodo = { type: 'query/todos', payload: string };
type Action = SelectTodos | QueryTodo;

const selectTodo = (value: Status): SelectTodos => (
  { type: 'select/todos', payload: value });
const queryTodo = (value: string): QueryTodo => (
  { type: 'query/todos', payload: value });

export const actions = {
  selectTodo,
  queryTodo,
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  startFilter = initialState, action: Action,
): State => {
  switch (action.type) {
    case 'query/todos':
      return { ...startFilter, query: action.payload };

    case 'select/todos':
      return { ...startFilter, status: action.payload };

    default:
      return startFilter;
  }
};

export default filterReducer;
