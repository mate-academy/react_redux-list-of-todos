// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

// payload is a typical name for an action data
type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: number;
};

// Action creator return type protect us from a mistype
const removeTodoId = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

const setTodoId = (todo: number): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

// These actions will be used in the application
export const currentTodoActions = { setTodoId, removeTodoId };

type State = number | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case 'currentTodo/SET':
      return action.payload;
    case 'currentTodo/REMOVE':
      return null;
    default:
      return state;
  }
};

export default currentTodoReducer;
