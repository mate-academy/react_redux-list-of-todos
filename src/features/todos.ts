import { Todo } from '../types/Todo';

type SetTodosActions = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodosActions => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

type State = Todo[];
type Action = SetTodosActions;

const todosReducer = (todos: State = [], action: Action): State => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
