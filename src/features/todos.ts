import { Todo } from '../types/Todo';

type Action = {
  type: 'todos/load';
  payload: Todo[];
};

const loadTodo = (todos: Todo[]): Action => ({
  type: 'todos/load',
  payload: todos,
});

export const actions = {
  loadTodo,
};

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/load':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
