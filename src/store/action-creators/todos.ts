import { Dispatch } from 'redux';
import { getTodos } from '../../api';
import { TodosAction, TodosActionTypes } from '../../types/Todo';

export function fetchTodos() {
  return async (dispatch: Dispatch<TodosAction>) => {
    try {
      dispatch({ type: TodosActionTypes.FETCH_TODOS });

      const response = await getTodos();

      dispatch({
        type: TodosActionTypes.FETCH_TODOS_SUCCESS,
        payload: response,
      });
    } catch {
      dispatch({
        type: TodosActionTypes.FETCH_TODOS_ERROR,
        payload: 'Something happen on the Server',
      });
    }
  };
}
