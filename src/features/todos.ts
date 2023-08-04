import { Todo } from '../types/Todo';

type StartFetchingTodosAction = { type: 'todos/LOADING' };
type SuccessFetchingTodosAction = { type: 'todos/LOADED'; payload: Todo[] };
type FailedFetchingTodosAction = { type: 'todos/ERROR'; payload: string };

const startFetchingTodos = (): StartFetchingTodosAction => ({
  type: 'todos/LOADING',
});

const setTodos = (todos: Todo[]): SuccessFetchingTodosAction => ({
  type: 'todos/LOADED',
  payload: todos,
});

const setTodosError = (message: string): FailedFetchingTodosAction => ({
  type: 'todos/ERROR',
  payload: message,
});

export const actions = { startFetchingTodos, setTodos, setTodosError };

type State = { items: Todo[]; isLoading: boolean; error: string };
type Action =
  | StartFetchingTodosAction
  | SuccessFetchingTodosAction
  | FailedFetchingTodosAction;

const todosReducer = (
  state: State = { items: [], isLoading: false, error: '' },
  action: Action,
): {
  items: Todo[];
  isLoading: boolean;
  error: string;
} => {
  switch (action.type) {
    case 'todos/LOADING':
      return { ...state, isLoading: true };
    case 'todos/LOADED':
      return { ...state, isLoading: false, items: action.payload };
    case 'todos/ERROR':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default todosReducer;
