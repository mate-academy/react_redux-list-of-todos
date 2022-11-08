import { Dispatch } from 'redux';
import {
  Todo, TodoAction, TodoTypes,
} from '../types/Todo';

export const actions = {

  getTodos: () => {
    return async (
      dispatch: Dispatch<TodoAction>,
    ) => {
      try {
        dispatch({ type: TodoTypes.START_LOADING });

        // eslint-disable-next-line max-len
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const json = await response.json();

        dispatch({ type: TodoTypes.FETCH_TODOS_SUCCESS, payload: json });
      } catch (error) {
        dispatch({
          type: TodoTypes.FETCH_TODOS_ERROR,
          payload: 'Error data',
        });
      } finally {
        dispatch({ type: TodoTypes.FINISH_LOADING });
      }
    };
  },

  setTodo: (todoId: number) => ({ type: TodoTypes.SET_TODO, payload: todoId }),
};

export const selectors = {
  getTodo: (todo: Todo[]) => todo,
  setTodo: (todoId: number) => todoId,
};

const TodosReducer = (
  state: { todos: Todo[], selectedTodoId: number | null, isLoading: boolean }
  = { todos: [], selectedTodoId: null, isLoading: false },
  action: TodoAction,
) => {
  switch (action.type) {
    case TodoTypes.START_LOADING:
      return { ...state, isLoading: true };

    case TodoTypes.FINISH_LOADING:
      return { ...state, isLoading: false };

    case TodoTypes.FETCH_TODOS_SUCCESS:
      return { ...state, todos: action.payload };

    case TodoTypes.SET_TODO:
      return { ...state, selectedTodoId: action.payload };

    default:
      return state;
  }
};

export default TodosReducer;
