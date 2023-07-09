import { Todo } from '../types/Todo';
import { TodoAction } from '../types/TodoAction';

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: TodoAction.REMOVE };

// payload is a typical name for an action data
type SetTodoAction = {
  type: TodoAction.SET;
  payload: Todo;
};

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({ type: TodoAction.REMOVE });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: TodoAction.SET,
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
    // Implement all actions here
    case TodoAction.SET:
      return {
        ...action.payload,
      };
    case TodoAction.REMOVE:
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
