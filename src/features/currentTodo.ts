import { Todo } from '../types/Todo';

export enum TodoActionTypes {
  REMOVE = 'currentTodo/REMOVE',
  SET = 'currentTodo/SET',
}
// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: TodoActionTypes.REMOVE };

// payload is a typical name for an action data
type SetTodoAction = {
  type: TodoActionTypes.SET;
  payload: Todo;
};

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({ type: TodoActionTypes.REMOVE });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: TodoActionTypes.SET,
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
    case TodoActionTypes.SET:
      return action.payload;
    case TodoActionTypes.REMOVE:
      return null;
    default:
      return state;
  }
};

export default currentTodoReducer;
