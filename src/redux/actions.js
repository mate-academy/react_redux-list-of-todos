export const LOAD_USER = 'load user';
export const LOAD_TODO = 'load todo';
export const DISPLAY = 'display';
export const DISPLAY_TODOS = 'display todos';
export const REMOVE = 'remove item';

export function loadUser() {
  return (dispatch) => {
    dispatch({
      type: LOAD_USER,
    });
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      const users = xhr.response;
      dispatch(display(users));
    });
    xhr.send();
  };
}

export function display(users) {
  return {
    type: DISPLAY,
    users,
  };
}

export function loadTodos() {
  return (dispatch) => {
    dispatch({
      type: LOAD_TODO,
    });
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      const todos = xhr.response;
      dispatch(displayTodos(todos));
    });
    xhr.send();
  };
}

export function displayTodos(todos) {
  return {
    type: DISPLAY_TODOS,
    todos,
  };
}

export function removeItem(index) {
  return {
    type: REMOVE,
    index,
  };
}
