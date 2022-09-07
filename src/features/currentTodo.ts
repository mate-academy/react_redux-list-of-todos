import { Todo } from '../types/Todo';

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

// payload is a typical name for an action data
type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

// Action creator return type protect us from a mistype
enum ActionsWithTodo {
  SET = 'currentTodo/SET',
  REMOVE = 'currentTodo/REMOVE',
}
const removeTodo = (): RemoveTodoAction => ({ type: ActionsWithTodo.REMOVE });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: ActionsWithTodo.SET,
  payload: todo,
});

// These actions will be used in the application
export const actionsWithTodo = {
  set: setTodo,
  remove: removeTodo,
};

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case ActionsWithTodo.SET:
      return action.payload;
    case ActionsWithTodo.REMOVE:
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
