import { Todo } from '../types/Todo';

type UpdateTodosAction = {
  type: 'todos/UPDATE';
  payload: Todo[];
};
type ClearTodosAction = {
  type: 'todos/CLEAR';
};

const updateTodos = (newTodos: Todo[]): UpdateTodosAction => ({
  type: 'todos/UPDATE',
  payload: newTodos,
});

const clearTodos = (): ClearTodosAction => ({
  type: 'todos/CLEAR',
});

export const actions = { updateTodos, clearTodos };

type Action = UpdateTodosAction | ClearTodosAction;

type Todos = Todo[];

const todosReducer = (
  todos: Todos = [],
  action: Action,
): Todos => {
  switch (action.type) {
    case 'todos/UPDATE':
      return action.payload;

    case 'todos/CLEAR':
      return [];

    default:
      return todos;
  }
};

export default todosReducer;
