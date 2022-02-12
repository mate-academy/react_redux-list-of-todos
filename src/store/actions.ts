export const LOADING_TODOS = 'LOADING_TODOS';
export const CHANGE_USER_ID = 'CHANGE_USER_ID';
export const DELETE_TODO = 'DELETE_TODO';

export const loadTodos = (payload: Todo[]) => ({ type: LOADING_TODOS, payload });

export const changeUserId = (payload: number) => ({ type: CHANGE_USER_ID, payload });

export const deleteTodo = (payload: number) => ({ type: DELETE_TODO, payload });
