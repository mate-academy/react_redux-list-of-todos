import { Todo } from '../types/Todo';

type SetTodos = { type: 'todos/setTodos'; payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodos => ({
  type: 'todos/setTodos',
  payload: todos,
});

export const actions = {
  setTodos,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (todos: Todo[] = [], action: SetTodos): Todo[] => {
  switch (action.type) {
    case 'todos/setTodos':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
