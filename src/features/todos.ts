import { Todo } from '../types/Todo';

type LoadAction = { type: 'todo/load', payload: Todo[] };

const loadTodo = (todos: Todo[]) => ({
  type: 'todo/load',
  payload: todos,
});

export const actions = { loadTodo };

const todosReducer = (todos: Todo[] = [], action: LoadAction): Todo[] => {
  switch (action.type) {
    case 'todo/load':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
