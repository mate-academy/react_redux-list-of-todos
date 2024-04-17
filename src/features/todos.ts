import { Todo } from '../types/Todo';

type TodosState = {
  todos: Todo[];
  loader: boolean;
  error: string;
};

const initialState: TodosState = {
  todos: [],
  loader: false,
  error: '',
};

type SetTodosAction = { type: 'todos/SET_TODOS'; payload: Todo[] };
type SetLoaderAction = { type: 'todos/SET_LOADER'; payload: boolean };
type SetErrorAction = { type: 'todos/SET_ERROR'; payload: string };

type Action = SetTodosAction | SetLoaderAction | SetErrorAction;

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET_TODOS',
  payload: todos,
});

const setLoader = (loader: boolean): SetLoaderAction => ({
  type: 'todos/SET_LOADER',
  payload: loader,
});

const setError = (error: string): SetErrorAction => ({
  type: 'todos/SET_ERROR',
  payload: error,
});

export const actions = { setTodos, setLoader, setError };
// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state = initialState, action: Action): TodosState => {
  switch (action.type) {
    case 'todos/SET_TODOS':
      return { ...state, todos: action.payload };

    case 'todos/SET_LOADER':
      return { ...state, loader: action.payload };

    case 'todos/SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default todosReducer;
