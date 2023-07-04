import { TodoWithUser } from '../types/Todo';

type RemoveTodoAction = { type: 'currentTodo/REMOVE' };
type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: TodoWithUser;
};

const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });
const setTodo = (todo: TodoWithUser): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

export const actions = { setTodo, removeTodo };

type State = TodoWithUser | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case 'currentTodo/REMOVE':
      return null;
    case 'currentTodo/SET':
      return action.payload;

    default:
      return state;
  }
};

export default currentTodoReducer;
