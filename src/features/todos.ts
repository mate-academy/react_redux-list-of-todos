import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/SET',
  payload: Todo[];
};

const setTodos = (todos: Todo[]):SetTodos => ({
  type: 'todos/SET',
  payload: todos,
});

type Action = SetTodos;

export const actions = { setTodos };

const todosReducer = (
  state: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return [...state];
  }
};

export default todosReducer;
