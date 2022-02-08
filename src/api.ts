import { loadSelectedUserAction, loadTodosAction } from './store';

const API_URL = 'https://mate.academy/students-api/todos';

export function getAllTodos() {
  return function (dispatch: any) {
    fetch(API_URL)
      .then(response => response.json())
      .then(json => dispatch(loadTodosAction(json)));
  };
}

export function getUser(userId: number) {
  return function (dispatch: any) {
    fetch(`https://mate.academy/students-api/users/${userId}`)
      .then(response => response.json())
      .then(json => dispatch(loadSelectedUserAction(json)));
  };
}

export function deleteTodo(todoId: number) {
  return fetch(`${API_URL}/${todoId}`, {
    method: 'DELETE',
  });
}
