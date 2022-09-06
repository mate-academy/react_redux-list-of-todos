import { Dispatch } from 'redux';
import type { LoadTodos, Action } from '.';
import { getTodos } from '../api';
import { Todo } from '../types/Todo';
import { LOADING_ACTIONS_CREATOR } from './loading';

export enum TodosActionType {
  SetTodos = 'todos/set_todos',
}

export type SetTodosAction = Action<TodosActionType.SetTodos, Todo []>;
export type TodosActions = SetTodosAction;
export const setTodosActionCreator = (todos: Todo[]): SetTodosAction => ({
  type: TodosActionType.SetTodos,
  payload: todos,
});

export const loadTodosAction = () => {
  return async (dispatch: Dispatch<LoadTodos>) => {
    dispatch(LOADING_ACTIONS_CREATOR.start());
    const todos = await getTodos();

    dispatch(setTodosActionCreator(todos));
    dispatch(LOADING_ACTIONS_CREATOR.finish());
  };
};

export const todosReducer = (
  todos: Todo[] = [],
  action: TodosActions,
): Todo[] => {
  switch (action.type) {
    case TodosActionType.SetTodos:
      return [...action.payload];

    default:
      return todos;
  }
};
