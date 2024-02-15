import { Todo } from '../types/Todo';

type SetbyTodos = {
  type: 'todos/SET',
  payload: Todo[],
};

const setTodos = (todos: Todo[]):SetbyTodos => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };
type Action = SetbyTodos;

const todosReducer = (
  todos: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
