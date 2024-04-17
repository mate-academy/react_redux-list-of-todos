import { Todo } from '../types/Todo';

type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

type SetLoadigAction = {
  type: 'currentTodo/SET_LOADING';
  payload: boolean;
};

type SetErrorAction = {
  type: 'currentTodo/SET_ERROR';
  payload: string;
};

const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

const setLoadig = (loading: boolean): SetLoadigAction => ({
  type: 'currentTodo/SET_LOADING',
  payload: loading,
});

const setError = (error: string): SetErrorAction => ({
  type: 'currentTodo/SET_ERROR',
  payload: error,
});

export const actions = { setTodo, removeTodo, setLoadig, setError };

type Action =
  | SetTodoAction
  | RemoveTodoAction
  | SetErrorAction
  | SetLoadigAction;

type State = {
  currentTodo: Todo | null;
  loading: boolean;
  error: string;
};

const initialState: State = {
  currentTodo: null,
  loading: false,
  error: '',
};

const currentTodoReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'currentTodo/SET':
      return { ...state, currentTodo: action.payload };
    case 'currentTodo/REMOVE':
      return { ...state, currentTodo: null };
    case 'currentTodo/SET_LOADING':
      return { ...state, loading: action.payload };
    case 'currentTodo/SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default currentTodoReducer;
