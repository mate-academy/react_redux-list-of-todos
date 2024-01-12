import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/ADD',
  payload: Todo[],
};

export const actions = {
  setTodos: (todos: Todo[]): SetTodos => ({
    type: 'todos/ADD',
    payload: todos,
  }),
};

const todosReducer = (todos: Todo[] = [], action: SetTodos): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return [...action.payload];
    default:
      return todos;
  }
};

export default todosReducer;
