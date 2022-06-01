import { User, Todo } from '../react-app-env';

export const LOAD_USER = 'LOAD_USER';
export const SELECT_USER = 'SELECT_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const LOAD_TODOS = 'LOAD_TODOS';
export const DELETE_TODO = 'DELETE_TODO';
export const LOAD_ERROR = 'LOAD_ERROR';

export const actions = {
  loadUserAction: (user: User) => ({
    type: LOAD_USER,
    user,
  }),
  selectUserAction: (userId: number) => ({
    type: SELECT_USER,
    userId,
  }),
  loadTodosAction: (todos: Todo[]) => ({
    type: LOAD_TODOS,
    todos,
  }),
  loadErrorAction: (message: string) => ({
    type: LOAD_ERROR,
    message,
  }),
};

export const deleteTodo = (id: number) => ({
  type: DELETE_TODO,
  id,
});

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};
