import { Dispatch } from 'redux';
import { getTodos, toggleTodo } from '../../api';

import { TodosActionTypes, TodosAction } from '../reducers/TodosReducer/types';

export const fetchTodos = (complete = '') => {
  return async (dispatch: Dispatch<TodosAction>) => {
    try {
      dispatch({ type: TodosActionTypes.FETCH_TODOS });
      const response = await getTodos(complete);

      dispatch({ type: TodosActionTypes.FETCH_TODOS_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: TodosActionTypes.FETCH_TODOS_ERROR, payload: 'Error fetching todos' });
    }
  };
};

export const toggleStatusTodo = (id: number, status: boolean) => {
  return async (dispatch: Dispatch<TodosAction>) => {
    try {
      dispatch({ type: TodosActionTypes.TOGGLE_STATUS_TODO });
      const response = await toggleTodo(id, status);

      dispatch({ type: TodosActionTypes.TOGGLE_STATUS_TODO_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: TodosActionTypes.TOGGLE_STATUS_TODO_ERROR, payload: 'Error toggling todo' });
    }
  };
};
