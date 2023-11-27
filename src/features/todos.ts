/* eslint-disable no-console */
import { getTodos } from '../api';
import { Todo } from '../types/Todo';

export const SET_TODOS = 'todos/SET_TODOS';

export const setTodos = (todos: Todo[]) => ({
  type: SET_TODOS,
  payload: todos,
});

export const fetchTodos = () => async (dispatch: any) => {
  try {
    const json = await getTodos();

    dispatch(setTodos(json));
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
};

interface TodosState {
  todos: Todo[];
}

type Action = ReturnType<typeof setTodos>;

const initialState: TodosState = {
  todos: [],
};

const todosReducer = (state = initialState, action: Action): TodosState => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export default todosReducer;
