import { Action, Dispatch } from 'redux';
import { Todo, TodoPayload, TodosAction } from '../types/Todo';
import { TodoActionTypes } from '../enums';
import { fetchTodos } from '../api';

export const loadTodos = () => ({
  type: TodoActionTypes.LOAD_TODOS,
  payload: {
    todos: [],
    isLoading: true,
    isError: false,
  },
});

export const setTodos = (todos: Todo[]) => ({
  type: TodoActionTypes.SET_TODOS,
  payload: {
    todos,
    isLoading: false,
    isError: false,
  },
});

export const errorTodos = () => ({
  type: TodoActionTypes.SET_TODOS,
  payload: {
    todos: [],
    isLoading: false,
    isError: true,
  },
});

export const getTodos = () => {
  return async (dispatch: Dispatch<Action<TodoActionTypes>>) => {
    try {
      dispatch(loadTodos());

      const todos = await fetchTodos();

      dispatch(setTodos(todos.data));
    } catch (error) {
      dispatch(errorTodos());
    }
  };
};

export const actions = { setTodos, loadTodos, errorTodos };

const initialState: TodoPayload = {
  todos: [],
  isLoading: false,
  isError: false,
};

const todosReducer = (
  state = initialState,
  action: TodosAction,
): TodoPayload => {
  switch (action.type) {
    case TodoActionTypes.SET_TODOS:
    case TodoActionTypes.LOAD_TODOS:
    case TodoActionTypes.ERROR_TODOS:
      return { ...action.payload };
    default:
      return { ...state };
  }
};

export default todosReducer;
