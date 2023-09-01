import { Todo } from '../types/Todo';

type RemoveTodoAction = { type: 'currentTodo/remove' };
type SetTodoAction = {
  type: 'currentTodo/set';
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/remove' });
const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/set',
  payload: todo,
});

export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case 'currentTodo/set':
      return action.payload;

    case 'currentTodo/remove':
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
