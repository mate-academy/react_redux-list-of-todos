import { Todo } from '../types/Todo';

type TodosState = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
};

type SetTodosAction = {
  type: 'todos/SET_TODOS';
  payload: Todo[];
};

type SetLoadingAction = {
  type: 'todos/SET_LOADING';
  payload: boolean;
};

type SetErrorAction = {
  type: 'todos/SET_ERROR';
  payload: string | null;
};

type TodosAction = SetTodosAction | SetLoadingAction | SetErrorAction;

const setTodos = (todos: Todo[]): SetTodosAction => {
  return {
    type: 'todos/SET_TODOS',
    payload: todos,
  };
};

const setLoading = (loading: boolean): SetLoadingAction => {
  return {
    type: 'todos/SET_LOADING',
    payload: loading,
  };
};

const setError = (error: string | null): SetErrorAction => {
  return {
    type: 'todos/SET_ERROR',
    payload: error,
  };
};

export const actions = {
  setTodos,
  setLoading,
  setError,
};

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

const todosReducer = (
  state: TodosState = initialState,
  action: TodosAction,
): TodosState => {
  switch (action.type) {
    case 'todos/SET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };
    case 'todos/SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'todos/SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default todosReducer;
