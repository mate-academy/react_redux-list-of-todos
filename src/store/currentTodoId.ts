import type { Action } from '.';

export enum TodoActionsType {
  SetCurrentTodoId = 'todo/set_current_todo',
}

export type SetCurrentTodoIdAction = Action<
TodoActionsType.SetCurrentTodoId, number | null>;

export type TodoActions = SetCurrentTodoIdAction;

const setCurrentTodoIdActionCreator = (
  todoId: number | null,
): SetCurrentTodoIdAction => ({
  type: TodoActionsType.SetCurrentTodoId,
  payload: todoId,
});

export const TODO_ACTIONS_CREATOR = {
  set: setCurrentTodoIdActionCreator,
};

const initialCurrentTodoId = null;

export const currentTodoIdReducer = (
  currentTodoId: number | null = initialCurrentTodoId,
  action: TodoActions,
) => {
  switch (action.type) {
    case TodoActionsType.SetCurrentTodoId:
      return action.payload;

    default:
      return currentTodoId;
  }
};
