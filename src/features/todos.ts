import { Todo } from '../types/Todo';

type LoadTodos = { type: 'todos/LOAD', payload: Todo[] };

type Action = LoadTodos;

const loadTodos = (todos: Todo[]): Action => ({
  type: 'todos/LOAD',
  payload: todos,
});

export const actions = { loadTodos };

const todosReducer = (todos: Todo[] = [], action: Action) => {
  switch (action.type) {
    case 'todos/LOAD':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
