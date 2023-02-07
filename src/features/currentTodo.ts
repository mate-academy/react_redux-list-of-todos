import { Todo } from '../types/Todo';

// we use string literal as a type to avoid mistype in future
type RemoveAction = { type: 'currentTodo/REMOVE' };

// payload is a typical name for an action data
type SetAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

// Action creator return type protect us from a mistype
export const removeTodo = (): RemoveAction => ({ type: 'currentTodo/REMOVE' });

export const setTodo = (todo: Todo): SetAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

// These actions will be used in the application
export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetAction | RemoveAction;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case ('currentTodo/REMOVE'):
      return null;

    case ('currentTodo/SET'):
      return action.payload;

    default:
      return state;
  }
};

export default currentTodoReducer;
