import { Todo, User } from '../react-app-env';

export const SET_TODOS = 'SET_TODOS';
export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const FILTER_TODOS = 'FILTER_TODOS';

export const setTodosAction = (payload: Todo[]) => ({
  type: SET_TODOS,
  payload,
});

export const setUserAction = (payload: User) => ({
  type: SET_USER,
  payload,
});

export const removeUserAction = () => ({
  type: REMOVE_USER,
});

// export const filterTodosAction = (payload: Todo[], text: string) => ({
//   type: FILTER_TODOS,
//   payload: payload.filter(todo => todo.title.includes(text)),
// });
