import { Todo } from '../types/Todo';
import { CurrentTodo } from '../types/CurrentTodo';

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: CurrentTodo.REMOVE };

// payload is a typical name for an action data
type SetTodoAction = {
  type: CurrentTodo.SET;
  payload: Todo;
};

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({ type: CurrentTodo.REMOVE });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: CurrentTodo.SET,
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
    case CurrentTodo.SET:
      return action.payload;

    case CurrentTodo.REMOVE:
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
