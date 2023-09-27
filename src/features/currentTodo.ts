import { Todo } from '../types/Todo';

const SET_CURRENT_TODO = 'currentTodo/SET';
const REMOVE_CURRENT_TODO = 'currentTodo/REMOVE';

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: typeof REMOVE_CURRENT_TODO };

// payload is a typical name for an action data
type SetTodoAction = {
  type: typeof SET_CURRENT_TODO;
  payload: Todo;
};

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({ type: REMOVE_CURRENT_TODO });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: SET_CURRENT_TODO,
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
    case SET_CURRENT_TODO:
      return action.payload;

    case REMOVE_CURRENT_TODO:
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
