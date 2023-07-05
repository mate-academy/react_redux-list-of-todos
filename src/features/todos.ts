import { Todo } from '../types/Todo';
import { TodosAction } from '../types/TodosAction';

type SetTodoAction = { type: TodosAction.SetTodos, payload: Todo[] };
type SetErrorAction = { type: TodosAction.SetError, payload: boolean };
type SetIsLoadingAction = { type: TodosAction.SetIsLoading, payload: boolean };

type Action = SetTodoAction | SetErrorAction | SetIsLoadingAction;

const setTodos = (loadTodos: Todo[]): SetTodoAction => ({
  type: TodosAction.SetTodos,
  payload: loadTodos,
});

const setError = (hasError: boolean): SetErrorAction => ({
  type: TodosAction.SetError,
  payload: hasError,
});

const setLoading = (isLoading: boolean): SetIsLoadingAction => ({
  type: TodosAction.SetIsLoading,
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
