import { Dispatch } from 'react';
import { BASE_URL } from '../../api';
import { TodosAction, TodosActionTypes } from '../types/todos';

export const fetchTodos = (status: string) => {
  return async (dispatch: Dispatch<TodosAction>) => {
    let response;

    try {
      dispatch({ type: TodosActionTypes.FETCH_TODOS });
      if (status === 'all') {
        response = await fetch(`${BASE_URL}/todos`);
      } else if (status === 'completed') {
        response = await fetch(`${BASE_URL}/todos?completed=true`);
      } else {
        response = await fetch(`${BASE_URL}/todos?completed=false`);
      }

      const todosFromServer = response.json();

      dispatch({ type: TodosActionTypes.FETCH_TODOS_SUCCESS, payload: await todosFromServer });
    } catch (error) {
      dispatch({
        type: TodosActionTypes.FETCH_TODOS_ERROR,
        payload: 'an error occurred while loading todos',
      });
    }
  };
};

export const setSelectedUserId = (userId: number | null): TodosAction => {
  return ({ type: TodosActionTypes.SELECT_USER_ID, payload: userId });
};

export const setSearchQuery = (searchQuery: string): TodosAction => {
  return ({ type: TodosActionTypes.SET_SEARCH_QUERY, payload: searchQuery });
};

export const setTodosStatus = (status: string): TodosAction => {
  return ({ type: TodosActionTypes.SET_TODOS_STATUS, payload: status });
};
