export const TODOS_LOAD = 'todos_load';
export const USERS_LOAD = 'users_load';

export const TODOS_RECEIVED = 'todos_received';
export const USERS_RECEIVED = 'users_received';

export const REMOVE_ITEM = 'todo_delete';

const serverUrl = 'https://jsonplaceholder.typicode.com/';

export const setLoadTodos = () => {
  return {
    type: TODOS_LOAD
  }
}

export const setLoadUsers = () => {
  return {
    type: USERS_LOAD
  }
}

export const loadTodos = () => (dispatch) => {
  dispatch(setLoadTodos());
  fetch(`${serverUrl}todos`)
    .then(response => response.json())
    .then(todoList => {
      dispatch(receiveTodos(todoList))
    })
};

export const loadUsers = () => (dispatch) => {
  dispatch(setLoadUsers());
  fetch(`${serverUrl}users`)
    .then(response => response.json())
    .then(userList => {
      dispatch(receiveUsers(userList))
    })
};

export const receiveTodos = (todoList) => {
  return {
    type: TODOS_RECEIVED,
    payload: todoList
  }
}

export const receiveUsers = (userList) => {
  return {
    type: USERS_RECEIVED,
    payload: userList
  }
}

export function getDeleteAction(id) {
  return {
    type: REMOVE_ITEM,
    id
  };
}
