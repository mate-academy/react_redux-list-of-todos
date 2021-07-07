import { AnyAction } from 'redux';

export type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

export type TodosState = {
  todos: Todo[];
  isLoading: boolean;
  isInitialized: boolean;
  hasError: boolean;
};

const initialState: TodosState = {
  todos: [],
  isLoading: false,
  isInitialized: false,
  hasError: false,
};

const SET_TODOS = 'todos/SET_TODOS';
const DELETE_TODO = 'todos/DELETE_TODO';
const SET_ERROR = 'todos/SET_ERROR';
const ENABLE_LOADING = 'todos/ENABLE_LOADING';
const DISABLE_LOADING = 'todos/DISABLE_LOADING';
const INITIALIZE = 'todos/INITIALIZE';
const CANCEL_INITIALIZATION = 'todos/CANCEL_INITIALIZATION';

export const actions = {
  setTodos: (todos: Todo[]) => ({
    type: SET_TODOS,
    payload: todos,
  }),
  deleteTodo: (id: number) => ({
    type: DELETE_TODO,
    payload: id,
  }),
  setError: (hasError: boolean) => ({
    type: SET_ERROR,
    payload: hasError,
  }),
  enableLoading: () => ({
    type: ENABLE_LOADING,
  }),
  disableLoading: () => ({
    type: DISABLE_LOADING,
  }),
  initialize: () => ({ type: INITIALIZE }),
  cancelInitialization: () => ({
    type: CANCEL_INITIALIZATION,
  }),
};

export const selectors = {
  getTodos: (state: TodosState) => state.todos,
  isLoading: (state: TodosState) => state.isLoading,
  isInitialized: (state: TodosState) => state.isInitialized,
  hasError: (state: TodosState) => state.hasError,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        isInitialized: true,
      };
    case CANCEL_INITIALIZATION:
      return {
        ...state,
        isInitialized: false,
      };
    case ENABLE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case DISABLE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case SET_ERROR:
      return {
        ...state,
        hasError: action.payload,
      };
    default:
      return state;
  }
};
