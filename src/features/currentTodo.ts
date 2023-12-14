import { Todo } from '../types/Todo';

const REMOVE_TODO = 'currentTodo/REMOVE';
const SET_TODO = 'currentTodo/SET';

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: typeof REMOVE_TODO };

// payload is a typical name for an action data
type SetTodoAction = { type: typeof SET_TODO; payload: Todo };

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({ type: REMOVE_TODO });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: SET_TODO,
  payload: todo,
});

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case SET_TODO: {
      return action.payload;
    }

    case REMOVE_TODO: {
      return null;
    }

    default:
      return state;
  }
};

export const actions = { setTodo, removeTodo };

export default currentTodoReducer;
