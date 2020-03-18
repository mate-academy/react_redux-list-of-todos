import { Dispatch } from 'redux';
import { getTodos, getUsers } from '../api/getData';

export const type = {
  SET_IS_LOADED: 'SET_IS_LOADED',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_QUERY_SORT: 'SET_QUERY_SORT',
  SET_TODOS: 'SET_TODOS',
  SET_USERS: 'SET_USERS',
  DELETE_TODO: 'DELETE_TODO',
};

export const setIsLoaded = (value: boolean) => ({
  type: type.SET_IS_LOADED,
  isLoaded: value,
});

export const setIsLoading = (value: boolean) => ({
  type: type.SET_IS_LOADING,
  isLoading: value,
});

export const setQuerySort = (value: string) => ({
  type: type.SET_QUERY_SORT,
  query: value,
});

export const setTodos = (todos: Todo[]) => ({
  type: type.SET_TODOS,
  todos: [...todos],
});

export const setUsers = (users: User[]) => ({
  type: type.SET_USERS,
  users: [...users],
});

export const setDeleteTodo = (id: number) => ({
  type: type.DELETE_TODO,
  index: id,
});

export const loadData = () => {
  return (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));

    Promise.all([getTodos(), getUsers()])
      .then(([todosFromServer, users]) => {
        dispatch(setUsers(users));
        dispatch(setTodos(todosFromServer));
        dispatch(setIsLoaded(true));
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};
