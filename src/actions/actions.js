import { ENDPOINTS } from '../consts';
import { TODOS_TEXT } from '../text';

export const TODO_ACTIONS = {
  GET_TODOS: 'GET_TODOS',
  GET_USERS: 'GET_USERS',
  SET_LOADING_ERROR: 'SET_LOADING_ERROR',
  CLOSE_TODO: 'CLOSE_TODO',
};

function getTodos(todos) {
  return {
    type: TODO_ACTIONS.GET_TODOS,
    payload: todos,
  };
}

function getUsers(users) {
  return {
    type: TODO_ACTIONS.GET_USERS,
    payload: users,
  };
}

function setLoadingError(error) {
  return {
    type: TODO_ACTIONS.SET_LOADING_ERROR,
    payload: error,
  };
}

function closeTodo(item) {
  return {
    type: TODO_ACTIONS.CLOSE_TODO,
    payload: item,
  };
}

function getData(url) {
  return fetch(url).then(response => response.json());
}

export function loadTodos() {
  return async(dispatch) => {
    dispatch(setLoadingError(null));

    try {
      Promise.all([
        getData(ENDPOINTS.TODOS),
        getData(ENDPOINTS.USERS),
      ]).then(([todos, users]) => {
        dispatch(getTodos(todos));
        dispatch(getUsers(users));
      });
    } catch (e) {
      dispatch(setLoadingError(TODOS_TEXT.LOADING_ERROR));
    }
  };
}

export function deleteTodo(id) {
  return (dispatch) => {
    dispatch(closeTodo(id));
  };
}
