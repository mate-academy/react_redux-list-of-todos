import { Action as BaseAction } from 'redux';
// import { Action as BaseAction, Dispatch } from 'redux';
// import { TodosApi } from '../api';
import { Todo } from '../types/Todo';

interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum TodosActionTypes {
  SetTodos = 'todos/set_todos',
  SetIsLoadingTodos = 'todos/set_isLoadingTodos',
}

export type SetTodosAction = Action<TodosActionTypes.SetTodos, Todo[]>;
export type SetIsLoadingAction =
Action<TodosActionTypes.SetIsLoadingTodos, boolean>;

type TodosActions = SetTodosAction | SetIsLoadingAction;

const setTodosActionCreator = (todos: Todo[]): SetTodosAction => ({
  type: TodosActionTypes.SetTodos,
  payload: todos,
});

// const loadTodosAction = async (dispatch: Dispatch<TodosActions>) => {
//   const todos = await TodosApi.getTodos();

//   dispatch(setTodosActionCreator(todos));
// };

const setIsLoadingTodosActionCreator = (
  value: boolean,
): SetIsLoadingAction => ({
  type: TodosActionTypes.SetIsLoadingTodos,
  payload: value,
});

export const TODOS_ACTIONS_CREATOR = {
  set: setTodosActionCreator,
  setIsLoading: setIsLoadingTodosActionCreator,
  // load: loadTodosAction,
};

export interface StateTodos {
  todos: Todo[];
  isLoading: boolean;
}

const initialState: StateTodos = {
  todos: [],
  isLoading: false,
};

const todosReducer = (
  state: StateTodos = initialState,
  action: TodosActions,
): StateTodos => {
  switch (action.type) {
    case TodosActionTypes.SetTodos:
      return {
        ...state,
        todos: action.payload,
      };

    case TodosActionTypes.SetIsLoadingTodos:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default todosReducer;
