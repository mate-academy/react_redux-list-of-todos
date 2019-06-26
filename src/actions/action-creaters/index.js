import {
  FETCH_TODOS_REQUEST,
  FETCH_USERS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_USERS_SUCCESS,
  TODOS_REQUEST_ERROR,
  USERS_REQUEST_ERROR,
  TODO_COMPLETE,
  TODO_SORT,
  TODO_DELETE,
} from '../action-types';



const todosRequested = () => {
  return {
    type: FETCH_TODOS_REQUEST
  }
};
const usersRequested = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
};

const todosLoaded = (newTodos) => {
  return {
    type: FETCH_TODOS_SUCCESS,
    payload: newTodos
  };
};
const usersLoaded = (newUsers) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: newUsers
  };
};

const todosError = (error) => {
  return {
    type: TODOS_REQUEST_ERROR,
    payload: error
  };
};

const usersError = (error) => {
  return {
    type: USERS_REQUEST_ERROR,
    payload: error
  };
};

const fetchTodos = (todosService, dispatch) => () => {
  dispatch(todosRequested());
  todosService.getTodos()
    .then((data) => dispatch(todosLoaded(data)))
    .catch((err) => dispatch(todosError(err)));
};

const fetchUsers = (todosService, dispatch) => () => {
  dispatch(usersRequested());
  todosService.getUsers()
    .then((data) => dispatch(usersLoaded(data)))
    .catch((err) => dispatch(usersError(err)));
};

const todoComplete = (todoId) => {
  return {
    type: TODO_COMPLETE,
    payload: todoId
  };
};
const todoSort = (sortParam) => {
  return {
    type: TODO_SORT,
    payload: sortParam
  };
};

const todoDelete = (id) => {
  return {
    type: TODO_DELETE,
    payload: id
  };
};

export {
  fetchTodos,
  fetchUsers,
  todoComplete,
  todoSort,
  todoDelete
}
