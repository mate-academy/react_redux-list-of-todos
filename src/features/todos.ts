import { Todo } from '../types/Todo';

interface State {
  todos: Todo[];
  todosIsLoading: boolean;
  error: string | null;
}

const initialState: State = {
  todos: [],
  todosIsLoading: false,
  error: null,
};

type SetTodosAction = {
  type: 'todos/set_todos',
  payload: Todo[],
};

type SetTodosIsLoadingAction = {
  type: 'todos/set_todos_isLoading',
  payload: boolean,
};

type SetTodosErrorAction = {
  type: 'todos/set_todos_error',
  payload: string | null,
};

export const setTodosActionCreator = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/set_todos',
  payload: todos,
});

export const setTodosIsLoadingAction = (
  loadingStatus: boolean,
): SetTodosIsLoadingAction => ({
  type: 'todos/set_todos_isLoading',
  payload: loadingStatus,
});

export const setTodosErrorAction = (
  error: string | null,
): SetTodosErrorAction => ({
  type: 'todos/set_todos_error',
  payload: error,
});

type Action = SetTodosAction | SetTodosIsLoadingAction | SetTodosErrorAction;

export const actions = {
  setTodosActionCreator,
  setTodosIsLoadingAction,
  setTodosErrorAction,
};

const todosReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case 'todos/set_todos':
      return {
        ...state,
        todos: action.payload,
      };
    case 'todos/set_todos_isLoading':
      return {
        ...state,
        todosIsLoading: action.payload,
      };
    case 'todos/set_todos_error':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default todosReducer;
