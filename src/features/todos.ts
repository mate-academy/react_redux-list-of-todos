import { Action as BaseAction } from 'redux';
import { Todo } from '../types/Todo';

interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum TodosActionType {
  SetTodos = 'todos/set_todos',
}

export type SetTodosAction = Action<TodosActionType.SetTodos, Todo[]>;

type TodosActions = SetTodosAction;

const setTodosActonCreator = (todos: Todo[]): SetTodosAction => ({
  type: TodosActionType.SetTodos,
  payload: todos,
});

export const actions = {
  set: setTodosActonCreator,
};

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
