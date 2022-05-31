import { User, Todo } from '../react-app-env';

export const LOAD_USER = 'LOAD_USER';
export const LOAD_TODOS = 'LOAD_TODOS';
export const DELETE_TODO = 'DELETE_TODO';

export const actions = {
  loadUser: (user: User) => ({
    type: LOAD_USER,
    user,
  }),
  loadTodos: (todos: Todo[]) => ({
    type: LOAD_TODOS,
    todos,
  }),
  deleteTodo: (id: number) => ({
    type: DELETE_TODO,
    id,
  }),
};
