import { Action as ActionBase } from 'redux';
import { Todo } from '../types/Todo';

interface Action<T, P> extends ActionBase<T> {
  payload: P,
}

export enum TodosActionsTypes {
  SetTodo = 'todos/set_todos',
}

export type SetTodosAction = Action<TodosActionsTypes.SetTodo, Todo[]>;

const setTodosActionCreator = (todos: Todo[]): SetTodosAction => ({
  type: TodosActionsTypes.SetTodo,
  payload: todos,
});

export const TODO_ACTIONS = {
  set: setTodosActionCreator,
};

type TodosActions = SetTodosAction;

export const todosReducer = (
  todosState: Todo[] = [],
  actions: TodosActions,
): Todo[] => {
  switch (actions.type) {
    case TodosActionsTypes.SetTodo:
      return actions.payload;

    default:
      return todosState;
  }
};

export default todosReducer;
