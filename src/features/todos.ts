import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[] | [];
};
type SetLoadigAction = {
  type: 'todos/SET_LOADING';
  payload: boolean;
};
type SetErrorAction = {
  type: 'todos/SET_ERROR';
  payload: string;
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});
const setLoadig = (loading: boolean): SetLoadigAction => ({
  type: 'todos/SET_LOADING',
  payload: loading,
});

const setError = (error: string): SetErrorAction => ({
  type: 'todos/SET_ERROR',
  payload: error,
});

type Action = SetTodosAction | SetLoadigAction | SetErrorAction;

type State = {
  todos: Todo[] | [];
  loading: boolean;
  error: string;
};

const initialState: State = {
  todos: [],
  loading: false,
  error: '',
};

export const actions = { setTodos, setLoadig, setError };

const todosReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'todos/SET':
      return { ...state, todos: action.payload };
    case 'todos/SET_LOADING':
      return { ...state, loading: action.payload };
    case 'todos/SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default todosReducer;
