import { Todo } from '../types/Todo';
import { Maybe } from '../types/Maybe';

type SelectTodo = {
  type: 'todo/SELECT',
  payload: Todo,
};

type UnselectTodo = {
  type: 'todo/UNSELECT',
};

type Action = SelectTodo | UnselectTodo;
type TodoState = Maybe<Todo>;

export const actions = {
  select: (todo: Todo): SelectTodo => ({
    type: 'todo/SELECT',
    payload: todo,
  }),
  unSelect: (): UnselectTodo => ({ type: 'todo/UNSELECT' }),
};

const currentTodoReducer = (state: TodoState = null, action: Action) => {
  switch (action.type) {
    case 'todo/SELECT':
      return action.payload;

    case 'todo/UNSELECT':
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
