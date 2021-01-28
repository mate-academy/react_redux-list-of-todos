import { } from 'redux-thunk';
import { AnyAction } from 'redux';
import { InitialTodosStateT, TODOSTYPE } from '../api/interface';

export const FETCH_TODOS_PENDING = 'FETCH_TODOS_PENDING';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR';
export const SELECTED_USER = 'SELECTED_USER';
export const CLEAR_SELECTED_USER = 'CLEAR_SELECTED_USER';
export const REMOVE_SELECTED_TODO = 'REMOVE_SELECTED_TODO';

const initialState: InitialTodosStateT = {
  pending: false,
  todos: [],
  error: null,
  selectedUserId: 0,
  selectedTodoId: 0,
};

export function fetchTodosPending() {
  return {
    type: FETCH_TODOS_PENDING,
  };
}

export function fetchTodosSuccess(todos: TODOSTYPE[]) {
  return {
    type: FETCH_TODOS_SUCCESS,
    todos,
  };
}

export function fetchTodosError(error: string) {
  return {
    type: FETCH_TODOS_ERROR,
    error,
  };
}

export function selectedUser(userId: number) {
  return {
    type: SELECTED_USER,
    userId,
  };
}

export function clearSelectedUser() {
  return {
    type: CLEAR_SELECTED_USER,
  };
}

export function removeSelectedTodo(todo: TODOSTYPE) {
  return {
    type: REMOVE_SELECTED_TODO,
    todo,
  };
}

export function todosReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case FETCH_TODOS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        pending: false,
        todos: action.todos,
      };
    case FETCH_TODOS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case SELECTED_USER:
      return {
        ...state,
        selectedUserId: action.userId,
      };
    case CLEAR_SELECTED_USER:
      return {
        ...state,
        selectedUserId: 0,
      };
    case REMOVE_SELECTED_TODO:
      return {
        ...state,
        todos: state.todos.map(
          todo => (todo.id === action.todo.id
            ? {
              ...action.todo,
            } : todo),
        ),
      };
    default:
      return state;
  }
}

export const getTodos = (state: InitialTodosStateT): TODOSTYPE[] => state.todos;
export const getTodosPending = (state: InitialTodosStateT): boolean => state.pending;
export const getTodosError = (state: InitialTodosStateT): string | null => state.error;
export const getUserId = (state: InitialTodosStateT): number => state.selectedUserId;
