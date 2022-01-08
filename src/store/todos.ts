import { AnyAction, Dispatch } from 'redux';
import { FilterTodoStatus } from '../types/filterTodoStatus';
import { Todo } from '../types/todo';
import { API } from '../utils/api';

export type InitStateTodo = {
  todos: Todo[] | never[];
  showStatus: string;
};

const initState: InitStateTodo = {
  todos: [],
  showStatus: FilterTodoStatus.All,
};

const SET_TODOS = 'SET_TODOS';
const SET_TODOS_STATUS = 'SET_TODOS_STATUS';
const DELETE_TODO = 'DELETE_TODO';

export const actions = {
  setTodos: (payload: Todo[]) => ({
    type: SET_TODOS,
    payload,
  }),

  fetchTodos() {
    return async (dispatch: Dispatch) => {
      try {
        const data = await API.getTodo();

        dispatch(this.setTodos(data));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };
  },
  setStatus: (payload: string) => ({ type: SET_TODOS_STATUS, payload }),
  deleteTodo: (payload: string | number) => ({ type: DELETE_TODO, payload }),
};

export function getTodos() {
  return (state: Todo[]) => state;
}

const todos = (state: InitStateTodo = initState, action: AnyAction) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    case SET_TODOS_STATUS:
      return {
        ...state,
        showStatus: action.payload,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo: Todo) => todo.id !== action.payload),
      };

    default:
      return state;
  }
};

export default todos;
