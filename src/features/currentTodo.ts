/* eslint-disable @typescript-eslint/default-param-last */
import { Todo } from '../types/Todo';

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

// payload is a typical name for an action data
type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

// These actions will be used in the application
export const actions = { setTodo, removeTodo };

type State = {
  todo: Todo | null;
};
type Action = SetTodoAction | RemoveTodoAction;

const initialState = {
  todo: null,
};

const currentTodoReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'currentTodo/SET':
      return {
        ...state,
        todo: action.payload,
      };

    case 'currentTodo/REMOVE':
      return {
        ...state,
        todo: null,
      };

    default:
      return state;
  }
};

export default currentTodoReducer;
