import { Todo } from '../types/Todo';

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: 'currentTodo/remove' };

// payload is a typical name for an action data
type SetTodoAction = {
  type: 'currentTodo/set';
  payload: Todo;
};

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/remove' });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/set',
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
    case 'currentTodo/set':
      return action.payload;
    case 'currentTodo/remove':
      return null;
    default:
      return state;
  }
};

export default currentTodoReducer;
