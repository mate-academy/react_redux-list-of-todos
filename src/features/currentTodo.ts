import type {
  Action,
  RemoveTodoAction,
  SetTodoAction,
  State,
} from '../types/CurrentTodoActions';
import { Todo } from '../types/Todo';

// Action creator return type protect us from a mistyped
const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

// These actions will be used in the application
export const actions = { setTodo, removeTodo };

// eslint-disable-next-line @typescript-eslint/default-param-last
const currentTodoReducer = (state: State = null, action: Action): State => {
  switch (action.type) {
    case 'currentTodo/SET':
      return action.payload;
    case 'currentTodo/REMOVE':
      return null;
    default:
      return state;
  }
};

export default currentTodoReducer;
