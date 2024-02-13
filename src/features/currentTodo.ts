import { Todo } from '../types/Todo';

enum ActionType {
  Set = 'currentTodo/SET',
  Remove = 'currentTodo/REMOVE',
}

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: ActionType.Remove };

// payload is a typical name for an action data
type SetTodoAction = {
  type: ActionType.Set;
  payload: Todo;
};

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({ type: ActionType.Remove });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: ActionType.Set,
  payload: todo,
});

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case ActionType.Set:
      return action.payload;

    case ActionType.Remove:
      return null;

    default:
      return state;
  }
};

// These actions will be used in the application
export const actions = { setTodo, removeTodo };

export default currentTodoReducer;
