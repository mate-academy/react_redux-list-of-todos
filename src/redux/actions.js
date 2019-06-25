export const LOAD = 'load';
export const TODOS_RECEIVED = 'todos_received';
export const USERS_RECEIVED = 'users_received';
export const DISPLAY = 'display';
export const SELECT = 'todos_select';
export const REMOVE_ITEM = 'todos_delete';
export const CHECK_DATA = 'check_data';

const serverUrl = 'https://jsonplaceholder.typicode.com/';

function loadData(dispatch) {
  sendRequest(`${serverUrl}todos`, requestPostsHandler, dispatch);
  sendRequest(`${serverUrl}users`, requestUsersHandler, dispatch);
}

function sendRequest(url, handler, dispatch) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', handler(request, dispatch));
  request.send();
}

const requestPostsHandler = (request, dispatch) => () => {
  const parseTodos = JSON.parse(request.responseText);
  dispatch(todosReceived(parseTodos));
}

const requestUsersHandler = (request, dispatch) => () => {
  const parseUsers = JSON.parse(request.responseText);
  dispatch(usersReceived(parseUsers));
}

export function load() {
  return (dispatch) => {
    dispatch({
      type: LOAD
    });
    loadData(dispatch);
  };
}

export function todosReceived(todos) {
  return (dispatch) => {
      dispatch({
          type: TODOS_RECEIVED,
          todos
      });
      dispatch(checkData());
  }
}

export function usersReceived(users) {
  return (dispatch) => {
      dispatch({
          type: USERS_RECEIVED,
          users
      });
      dispatch(checkData());
  }
}

export function checkData() {
    return {
        type: CHECK_DATA
    };
}

function isLoading(state) {
  return !state.todos || !state.users;
}

export function mapData(state) {
  if (isLoading(state)) return null;
  const todoListMap = state.todos.map(todo => ({...todo,
    user: state.users.find(user => user.id === todo.userId),
  }));
  return todoListMap;
}

export function display(todoList) {
  return {
    type: DISPLAY,
    todoList
  };
}

export function getSelectAction(id) {
  return {
    type: SELECT,
    id
  };
}

export function getDeleteAction(id) {
  return {
    type: REMOVE_ITEM,
    id
  };
}
