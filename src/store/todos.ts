import { Action as BaseAction } from 'redux';
import { Todo } from '../types/Todo';

export enum TodosActionType {
  StartLoadingTodos = 'todos/START_LOADING_TODOS',
  SetTodos = 'todos/SET_TODOS',
  FinishLoadingTodos = 'todos/FINISH_LOADING_TODOS',
  ErrorLoading = 'todos/ERROR_LOADING',
}

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

type StartLoadingTodosAction = BaseAction<TodosActionType.StartLoadingTodos>;
type SetTodosAction = Action<TodosActionType.SetTodos, Todo[]>;
type FinishLoadingTodos = BaseAction<TodosActionType.FinishLoadingTodos>;
type ErrorLoadingAction = Action<TodosActionType.ErrorLoading, string>;

export type TodosAction = StartLoadingTodosAction | SetTodosAction
| FinishLoadingTodos | ErrorLoadingAction;

export const actions = {
  startLoadingTodosActionCreator: (): StartLoadingTodosAction => ({
    type: TodosActionType.StartLoadingTodos,
  }),
  setTodosActionCreator: (todos: Todo[]): SetTodosAction => ({
    type: TodosActionType.SetTodos,
    payload: todos,
  }),
  finishLoadingTodosCreator: (): FinishLoadingTodos => ({
    type: TodosActionType.FinishLoadingTodos,
  }),
  errorLoadingActionCreator: (error: string): ErrorLoadingAction => ({
    type: TodosActionType.ErrorLoading,
    payload: error,
  }),
};

export interface TodosState {
  todos: Todo[],
  isLoading: boolean,
  err: string,
}

export const selector = {
  getIsLoading: (state: TodosState): boolean => state.isLoading,
  getTodos: (state: TodosState): Todo[] => state.todos,
};

const initialState: TodosState = {
  todos: [],
  isLoading: false,
  err: '',
};

const todosReduser = (
  state = initialState,
  action: TodosAction,
) => {
  switch (action.type) {
    case TodosActionType.StartLoadingTodos:
      return {
        ...state,
        isLoading: true,
      };

    case TodosActionType.SetTodos:
      return {
        ...state,
        todos: action.payload,
      };

    case TodosActionType.FinishLoadingTodos:
      return {
        ...state,
        isLoading: false,
      };

    case TodosActionType.ErrorLoading:
      return {
        ...state,
        err: action.payload,
      };

    default:
      return state;
  }
};

export default todosReduser;
