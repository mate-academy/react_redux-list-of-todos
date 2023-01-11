import { Todo } from '../types/Todo';

type TodosState = {
  todos: Todo[],
  loading: boolean,
  error: string,
};

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: '',
};

type SetTodosAction = { type: 'todos/SET', payload: TodosState['todos'] };

type SetTodosLoading = {
  type: 'todos/LOADING',
  payload: TodosState['loading'],
};

type SetTodosError = { type: 'todos/ERROR', payload: TodosState['error'] };

type Action = SetTodosAction | SetTodosLoading | SetTodosError;

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

const setLoading = (value: boolean): SetTodosLoading => ({
  type: 'todos/LOADING',
  payload: value,
});

const setError = (value: string): SetTodosError => ({
  type: 'todos/ERROR',
  payload: value,
});

export const actions = { setTodos, setLoading, setError };

const todosReducer = (
  state: TodosState = initialState,
  action: Action,
): TodosState => {
  switch (action.type) {
    case 'todos/SET':
      return {
        ...state,
        todos: action.payload,
      };

    case 'todos/LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'todos/ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default todosReducer;
