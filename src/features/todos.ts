import { Action } from 'redux';
import { Todo } from '../types/Todo';

interface FullAction<T, P> extends Action<T> {
  payload: P,
}

export enum TodosActionType {
  SetTodos = 'todos/set_todos',
}

export type SetTodosAction = FullAction<TodosActionType.SetTodos, Todo[]>;

const setTodosActionCreator = (todos: Todo[]): SetTodosAction => ({
  type: TodosActionType.SetTodos,
  payload: todos,
});

export const actionsTodo = {
  set: setTodosActionCreator,
};

type TodosActions = SetTodosAction;

const todosReducer = (
  todosState: Todo[] = [],
  action: TodosActions,
): Todo[] => {
  switch (action.type) {
    case TodosActionType.SetTodos:
      return action.payload;

    default:
      return todosState;
  }
};

export default todosReducer;
