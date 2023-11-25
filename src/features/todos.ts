import { Todo } from '../types/Todo';

type TodosState = {
  todos: Todo[],
  isLoading: boolean,
  error: string,
};

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

type SetLoadingAction = {
  type: 'todos/LOADING',
  payload: boolean,
};

type SetErrorAction = {
  type: 'todos/ERROR',
  payload: string,
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

const setLoading = (value: boolean): SetLoadingAction => ({
  type: 'todos/LOADING',
  payload: value,
});

const setError = (value: string): SetErrorAction => ({
  type: 'todos/ERROR',
  payload: value,
});

export const actions = { setTodos, setLoading, setError };

type Action = SetTodosAction | SetLoadingAction | SetErrorAction;

const todosReducer = (
  todosState: TodosState = {
    todos: [],
    isLoading: false,
    error: '',
  },
  action: Action,
): TodosState => {
  switch (action.type) {
    case 'todos/SET':
      return { ...todosState, todos: action.payload };

    case 'todos/LOADING':
      return { ...todosState, isLoading: action.payload };

    case 'todos/ERROR':
      return { ...todosState, error: action.payload };

    default:
      return todosState;
  }
};

export default todosReducer;
