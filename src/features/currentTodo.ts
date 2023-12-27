import { Todo } from '../types/Todo';

type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

type SetTodoAction = {
  type: 'currentTodo/SET';
  payload?: Todo | null;
};

const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  if (!action || !action.type) {
    return state;
  }

  switch (action.type) {
    case 'currentTodo/SET':

      if (!action.payload) {
        return null;
      }

      return action.payload;

    case 'currentTodo/REMOVE':
      return null;
    default:
      return state;
  }
};

export default currentTodoReducer;
