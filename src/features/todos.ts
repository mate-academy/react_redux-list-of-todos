import { Todo } from '../types/Todo';

interface LoadTodos {
  type: 'todos/LOAD',
  payload: Todo[]
}

const loadTodos = (todos: Todo[]): LoadTodos => (
  { type: 'todos/LOAD', payload: todos }
);

export const actions = { loadTodos };

const todosReducer = (
  todos: Todo[] = [], action: LoadTodos,
): Todo[] => {
  switch (action.type) {
    case 'todos/LOAD': {
      return action.payload;
    }

    default:
      return todos;
  }
};

export default todosReducer;
