import type { RootState } from '../app/store';
import { Todo } from '../types/Todo';

export enum TodosActionType {
  SetTodos = 'todos/SET',
}

type SetTodosAction = {
  type: TodosActionType.SetTodos,
  payload: Todo[],
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: TodosActionType.SetTodos,
  payload: todos,
});

export const TODOS_ACTIONS = { setTodos };

export const TODOS_SELECTORS = {
  getTodos: (state: RootState) => state.todos,
  getPreparedTodos: (state: RootState) => {
    const { todos, filter } = state;
    const { query, status } = filter;

    let preparedTodos: Todo[];

    switch (status) {
      case 'completed':
        preparedTodos = [...todos].filter(todo => todo.completed);
        break;
      case 'active':
        preparedTodos = [...todos].filter(todo => !todo.completed);
        break;
      case 'all':
      default:
        preparedTodos = [...todos];
        break;
    }

    return preparedTodos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  },
};

type State = Todo[];
type TodosActions = SetTodosAction;

const todosReducer = (
  state: State = [],
  action: TodosActions,
): Todo[] => {
  switch (action.type) {
    case TodosActionType.SetTodos:
      return [...action.payload];
    default:
      return state;
  }
};

export default todosReducer;
