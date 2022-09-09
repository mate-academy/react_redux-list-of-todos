// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: 'currentTodoID/REMOVE' };

// payload is a typical name for an action data
type SetTodoAction = {
  type: 'currentTodoID/SET';
  payload: number;
};

// Action creator return type protect us from a mistype
enum TodoIDActionType {
  SET = 'currentTodoID/SET',
  REMOVE = 'currentTodoID/REMOVE',
}
const unselectTodoID = (): RemoveTodoAction => (
  { type: TodoIDActionType.REMOVE }
);

const selectTodoID = (todoID: number): SetTodoAction => ({
  type: TodoIDActionType.SET,
  payload: todoID,
});

// These actions will be used in the application
export const actionsWithTodoID = {
  set: selectTodoID,
  remove: unselectTodoID,
};

type State = number | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoIDReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case TodoIDActionType.SET:
      return action.payload;
    case TodoIDActionType.REMOVE:
      return null;

    default:
      return state;
  }
};

export default currentTodoIDReducer;
