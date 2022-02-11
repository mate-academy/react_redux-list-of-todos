import { SET_TODOS, SET_USER, SET_USER_ID } from '.';

export const setUserIdAction = (payloud = 0) => ({ type: SET_USER_ID, payloud });
export const clearUserIdAction = () => ({ type: SET_USER_ID, payloud: 0 });
export const setUserAction = (payloud: User) => ({ type: SET_USER, payloud });
export const clearUserAction = () => ({ type: SET_USER, payloud: null });
export const setTodosAction = (payloud: Todo[] = []) => ({ type: SET_TODOS, payloud });
