import { } from 'redux-thunk';
import { AnyAction } from 'redux';
import { InitialTodosStateT, TODOSTYPE } from '../api/interface';

export const FETCH_TODOS_PENDING = 'FETCH_TODOS_PENDING';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR';
export const UPDATE_SELECTED_TODO = 'REMOVE_SELECTED_TODO';
export const ALL_TODOS = 'All_TODOS';
export const COMPLETED_TODOS = 'COMPLETED_TODOS';
export const ACTIVE_TODOS = 'ACTIVE_TODOS';
export const FILTERING = 'FILTERING';

const initialState: InitialTodosStateT = {
  pending: false,
  todos: [],
  error: null,
  selectedTodoId: 0,
  filteringType: ALL_TODOS,
  query: '',
};

export function allTodosAction() {
  return {
    type: ALL_TODOS,
  };
}

export function completedTodosAction() {
  return {
    type: COMPLETED_TODOS,
  };
}

export function activeTodosAction() {
  return {
    type: ACTIVE_TODOS,
  };
}

export function filterTodos(query: string) {
  return {
    type: FILTERING,
    query,
  };
}

export function setPending() {
  return {
    type: FETCH_TODOS_PENDING,
  };
}

export function setTodos(todos: TODOSTYPE[]) {
  return {
    type: FETCH_TODOS_SUCCESS,
    todos: todos.filter(todo => todo.title),
  };
}

export function setTodosError(error: string) {
  return {
    type: FETCH_TODOS_ERROR,
    error,
  };
}

export function updateTodo(todo: TODOSTYPE) {
  return {
    type: UPDATE_SELECTED_TODO,
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
    case UPDATE_SELECTED_TODO:
      return {
        ...state,
        todos: state.todos.map(
          todo => (todo.id === action.todo.id
            ? {
              ...action.todo,
            } : todo),
        ),
      };
    case ALL_TODOS:
    case ACTIVE_TODOS:
    case COMPLETED_TODOS:
      return {
        ...state,
        filteringType: action.type,
      };
    case FILTERING:
      return {
        ...state,
        query: action.query,
      };
    default:
      return state;
  }
}

export const getTodos = (state: InitialTodosStateT): TODOSTYPE[] => state.todos;
export const getTodosPending = (state: InitialTodosStateT): boolean => state.pending;
export const getTodosError = (state: InitialTodosStateT): string | null => state.error;
export const getFilteringType = (state: InitialTodosStateT): string => state.filteringType;
export const getQueryFiltering = (state: InitialTodosStateT): string => state.query;
