import { Dispatch } from 'redux';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

export const SET_TODOS = 'todos/SET';
export const FETCH_TODOS_START = 'todos/FETCH_START';
export const FETCH_TODOS_SUCCESS = 'todos/FETCH_SUCCESS';
export const FETCH_TODOS_FAILURE = 'todos/FETCH_FAILURE';

export const setTodos = (todos: Todo[]) => ({
  type: SET_TODOS,
  payload: todos,
});

export const fetchTodosStart = () => ({
  type: FETCH_TODOS_START,
});

export const fetchTodosSuccess = () => ({
  type: FETCH_TODOS_SUCCESS,
});

export const fetchTodosFailure = (error: string) => ({
  type: FETCH_TODOS_FAILURE,
  payload: error,
});

export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchTodosStart());

      const todos = await getTodos();

      dispatch(setTodos(todos));
      dispatch(fetchTodosSuccess());
    } catch (error: any) {
      dispatch(fetchTodosFailure(error.message));
    }
  };
};

const todosReducer = (
  state: {
    data: Todo[];
    isLoading: boolean;
    error: string | null
  } = { data: [], isLoading: false, error: null }, action: any,
) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state, data: action.payload, isLoading: false, error: null,
      };
    case FETCH_TODOS_START:
      return { ...state, isLoading: true, error: null };
    case FETCH_TODOS_SUCCESS:
      return { ...state, isLoading: false, error: null };
    case FETCH_TODOS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const actions = {
  setTodos,
  fetchTodosStart,
  fetchTodosFailure,
  fetchTodosSuccess,
};

export default todosReducer;
