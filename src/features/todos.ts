/* eslint-disable @typescript-eslint/default-param-last */
import { Todo } from '../types/Todo';

type TodosState = {
  error: string;
  loading: boolean;
  todos: Todo[];
};

const initState: TodosState = {
  error: '',
  loading: false,
  todos: [],
};

type SetTodosAction = { type: 'todos/SET_TODOS'; payload: Todo[] };
type SetLoadingAction = { type: 'todos/SET_LOADING'; payload: boolean };
type SetErrorAction = { type: 'todos/SET_ERROR'; payload: string };

type Action = SetTodosAction | SetErrorAction | SetLoadingAction;

const setLoading = (loading: boolean): SetLoadingAction => ({
  type: 'todos/SET_LOADING',
  payload: loading,
});

const setError = (error: string): SetErrorAction => ({
  type: 'todos/SET_ERROR',
  payload: error,
});

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET_TODOS',
  payload: todos,
});

export const actions = { setLoading, setError, setTodos };

const todosReducer = (
  state: TodosState = initState,
  action: Action,
): TodosState => {
  switch (action.type) {
    case 'todos/SET_LOADING':
      return { ...state, loading: action.payload };
    case 'todos/SET_ERROR':
      return { ...state, error: action.payload };
    case 'todos/SET_TODOS':
      return { ...state, todos: action.payload };
    default:
      return state;
  }
};

export default todosReducer;
