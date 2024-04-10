/* eslint-disable @typescript-eslint/default-param-last */
import { Todo } from '../types/Todo';

type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

type SetLoadingAction = { type: 'currentTodo/SET_LOADING'; payload: boolean };
type SetErrorAction = { type: 'currentTodo/SET_ERROR'; payload: string };

const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

const setLoading = (loading: boolean): SetLoadingAction => ({
  type: 'currentTodo/SET_LOADING',
  payload: loading,
});
const setError = (error: string): SetErrorAction => ({
  type: 'currentTodo/SET_ERROR',
  payload: error,
});

export const actions = { setTodo, removeTodo, setLoading, setError };

type State = Todo | null;

type InitialState = {
  currentTodoLoading: boolean;
  currentTodo: State;
  error: string;
};

const initState: InitialState = {
  currentTodoLoading: false,
  currentTodo: null,
  error: '',
};

type Action =
  | SetTodoAction
  | RemoveTodoAction
  | SetLoadingAction
  | SetErrorAction;

const currentTodoReducer = (
  state: InitialState = initState,
  action: Action,
): InitialState => {
  switch (action.type) {
    case 'currentTodo/REMOVE':
      return { ...state, currentTodo: null };
    case 'currentTodo/SET':
      return { ...state, currentTodo: action.payload };
    case 'currentTodo/SET_LOADING':
      return { ...state, currentTodoLoading: action.payload };
    case 'currentTodo/SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default currentTodoReducer;
