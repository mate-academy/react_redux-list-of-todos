import { Todo } from '../types/Todo';

// we use string literal as a type to avoid mistype in future
const REMOVE = 'currentTodo/REMOVE';
const SET = 'currentTodo/SET';

type RemoveTodoAction = { type: typeof REMOVE };

// payload is a typical name for an action data
type SetTodoAction = {
  type: typeof SET;
  payload: Todo;
};

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({ type: REMOVE });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: SET,
  payload: todo,
});

// These actions will be used in the application
export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (state: State = null, action: Action): State => {
  switch (action.type) {
    case SET:
      return action.payload;

    case REMOVE:
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
