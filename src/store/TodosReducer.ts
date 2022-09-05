import { Dispatch } from 'redux';
import {
  Todo, TodoAction, TodoTypes,
} from '../types/Todo';

export const actions = {

  getTodos: () => {
    return async (dispatch: Dispatch<TodoAction>) => {
      try {
        dispatch({ type: TodoTypes.FETCH_TODOS });

        // eslint-disable-next-line max-len
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const json = await response.json();

        dispatch({ type: TodoTypes.FETCH_TODOS_SUCCESS, payload: json });
      } catch (error) {
        dispatch({
          type: TodoTypes.FETCH_TODOS_ERROR,
          payload: 'Error data',
        });
      }
    };
  },
};

export const selectors = {
  getTodo: (todo: Todo[]) => todo,
};

const TodosReducer = (
  state: Todo[] = [],
  action: TodoAction,
): Todo[] => {
  switch (action.type) {
    case TodoTypes.FETCH_TODOS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};

export default TodosReducer;
