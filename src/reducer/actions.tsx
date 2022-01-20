import { TODOS_LOAD, SELECT_USER_TODO } from './types';

export function selectUser(id: number): (dispatch: any) => Promise<void> {
  return async dispatch => {
    const response = await fetch(`https://mate.academy/students-api/users/${id}`);
    const jsonData = await response.json();

    dispatch({
      type: SELECT_USER_TODO,
      data: jsonData,
    });
  };
}

export function todosLoad(): (dispatch: any) => Promise<void> {
  return async dispatch => {
    const response = await fetch('https://mate.academy/students-api/todos');
    const jsonData = await response.json();

    dispatch({
      type: TODOS_LOAD,
      data: jsonData,
    });
  };
}
