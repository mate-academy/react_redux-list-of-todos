import { Dispatch } from 'redux';
import {
  IS_LOADING,
  SET_TODOS,
  DELETE_TODO,
  SET_SORT_TYPE,
} from './actionTypes';
import { todosPreparer } from '../api/utils/todosPreparer';


export const setIsLoadind = (value: boolean) => ({
  type: IS_LOADING,
  isLoading: value,
});

export const setTodos = (preparedTodos: TodoWithUser[]) => ({
  type: SET_TODOS,
  todos: preparedTodos,
});

export const deleteTodo = (id: number) => ({
  type: DELETE_TODO,
  id,
});

export const setSortType = (sortType: string) => ({
  type: SET_SORT_TYPE,
  typeOfSort: sortType,
});

export const loadTodos = () => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsLoadind(true));
    const todosWithUser = await todosPreparer();

    dispatch(setTodos(todosWithUser));
  };
};
