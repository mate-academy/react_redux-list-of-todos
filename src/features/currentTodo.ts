import type { RootState } from '../app/store';
import { Todo } from '../types/Todo';

type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

export const todoSelector = {
  getCurrentTodo: (state: RootState) => state.currentTodo,
};

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case 'currentTodo/SET':
      return action.payload;

    case 'currentTodo/REMOVE':
      return null;

    default:
      return state;
  }
};

export const actions = { setTodo, removeTodo };

export default currentTodoReducer;
