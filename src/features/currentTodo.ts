import { Todo } from '../types/Todo';

const enum ActionType {
  set = 'currentTodo/SET',
  remove = 'currentTodo/REMOVE',
}

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = {
  type: ActionType.remove;
};

// payload is a typical name for an action data
type SetTodoAction = {
  type: ActionType.set;
  payload: Todo;
};

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({ type: ActionType.remove });

const setTodo = (todo: Todo): SetTodoAction => {
  return ({
    type: ActionType.set,
    payload: todo,
  });
};

// These actions will be used in the application
export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case ActionType.set:
      return action.payload;
    case ActionType.remove:
      return null;
    default:
      return state;
  }
};

export default currentTodoReducer;
