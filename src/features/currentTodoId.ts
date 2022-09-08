import { Action } from '../types/Action';

export enum CurrentTodoIdActionType {
  SetCurrentTodoId = 'currentTodoId/set_current_todo_id',
}
export type CurrentTodoId = number | null;

type SetCurrentTodoIdAction = (
  Action<CurrentTodoIdActionType.SetCurrentTodoId, CurrentTodoId>
);

const setCurrentTodoIdActionCreator = (
  todoId: CurrentTodoId,
): SetCurrentTodoIdAction => ({
  type: CurrentTodoIdActionType.SetCurrentTodoId,
  payload: todoId,
});

export const CURRENT_TODO_ID_ACTIONS_CREATOR = {
  set: setCurrentTodoIdActionCreator,
};

const currentTodoIdReducer = (
  todoIdState: CurrentTodoId = null,
  action: SetCurrentTodoIdAction,
): CurrentTodoId => {
  switch (action.type) {
    case CurrentTodoIdActionType.SetCurrentTodoId:
      return action.payload;

    default:
      return todoIdState;
  }
};

export default currentTodoIdReducer;
