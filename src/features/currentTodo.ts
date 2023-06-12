import { Todo } from '../types/Todo';

type RemoveAction = { type: 'currentTodo/REMOVE' };

type SetAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

const removeTodo = (): RemoveAction => ({ type: 'currentTodo/REMOVE' });

const setTodo = (todo: Todo): SetAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetAction | RemoveAction;

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

export default currentTodoReducer;
