import { Action as BaseAction } from 'redux';
import { Todo } from '../types/Todo';

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum TodosActionType {
  SetTodosType = 'todos/set_todos',
}

type SetTodosActions = Action<TodosActionType.SetTodosType, Todo[]>;

const setTodosActionCreator = (todos: Todo[]): SetTodosActions => ({
  type: TodosActionType.SetTodosType,
  payload: todos,
});

export const actions = { set: setTodosActionCreator };

const todosReducer = (
  todosState: Todo[] = [],
  action: SetTodosActions,
): Todo[] => {
  switch (action.type) {
    case TodosActionType.SetTodosType:
      return [...action.payload];

    default:
      return todosState;
  }
};

export default todosReducer;
