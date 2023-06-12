import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'todos/setTodos';
  payload: Todo[];
};

type SetErrorAction = {
  type: 'todos/setError';
  payload: boolean;
};

type SetIsLoadingAction = {
  type: 'todos/setIsLoading';
  payload: boolean;
};

type Action = SetTodoAction
| SetErrorAction
| SetIsLoadingAction;

const setTodos = (loadTodos: Todo[]): SetTodoAction => ({
  type: 'todos/setTodos',
  payload: loadTodos,
});

const setError = (hasError: boolean): SetErrorAction => ({
  type: 'todos/setError',
  payload: hasError,
});

const setLoading = (isLoading: boolean): SetIsLoadingAction => ({
  type: 'todos/setIsLoading',
  payload: isLoading,
});

export const actions = { setTodos, setError, setLoading };

export type State = {
  todos: Todo[],
  hasError: boolean,
  isLoading: boolean,
};

const initialState = {
  todos: [],
  hasError: false,
  isLoading: false,
};

const todosReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'todos/setTodos':
      return {
        ...state,
        todos: [...action.payload],
      };

    case 'todos/setError':
      return {
        ...state,
        hasError: action.payload,
      };

    case 'todos/setIsLoading':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default todosReducer;
