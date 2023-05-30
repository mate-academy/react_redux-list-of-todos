import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'todos/SetTodos', payload: Todo[] };
type SetErrorAction = { type: 'todos/SetError', payload: boolean };
type SetLoadingAction = { type: 'todos/SetLoading', payload: boolean };

const SetTodos = (LoadedTodos: Todo[]): SetTodosAction => ({
  type: 'todos/SetTodos',
  payload: LoadedTodos,
});

const SetError = (error: boolean): SetErrorAction => ({
  type: 'todos/SetError',
  payload: error,
});

const SetLoading = (loading: boolean) : SetLoadingAction => ({
  type: 'todos/SetLoading',
  payload: loading,
});

export const actions = { SetTodos, SetError, SetLoading };

type Action = SetTodosAction | SetErrorAction | SetLoadingAction;
export type TodoState = {
  todos: Todo[],
  isError: boolean,
  isLoading: boolean,
};

const initialState = {
  todos: [],
  isError: false,
  isLoading: true,
};

const todosReducer = (
  state = initialState,
  action: Action,
): TodoState => {
  switch (action.type) {
    case 'todos/SetError':
      return {
        ...state,
        isError: action.payload,
      };
    case 'todos/SetTodos':
      return {
        ...state,
        todos: [...action.payload],
      };
    case 'todos/SetLoading':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default todosReducer;
