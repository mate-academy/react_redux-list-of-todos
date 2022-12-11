import { Todo } from '../types/Todo';
import { CURRENT_TODO_REMOVE, CURRENT_TODO_SET } from '../types/types';

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: typeof CURRENT_TODO_REMOVE };

// payload is a typical name for an action data
type SetTodoAction = {
  type: typeof CURRENT_TODO_SET;
  payload: Todo;
};

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({ type: CURRENT_TODO_REMOVE });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: CURRENT_TODO_SET,
  payload: todo,
});

// These actions will be used in the application
export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case CURRENT_TODO_SET:
      return action.payload;
    case CURRENT_TODO_REMOVE:
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
