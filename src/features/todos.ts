import { Todo } from '../types/Todo';

type LoadTodos = {
  type: 'todos/LOAD',
  payload: Todo[]
};

const loadTodos = (todos: Todo[]): LoadTodos => (
  { type: 'todos/LOAD', payload: todos }
);

export const actions = {
  loadTodos,
};

const todosReducer = (state: Todo[] = [], action: LoadTodos) => {
  switch (action.type) {
    case 'todos/LOAD':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
