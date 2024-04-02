import { Todo } from '../types/Todo';

type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;
// eslint-disable-next-line @typescript-eslint/default-param-last
const currentTodoReducer = (state: State = null, action: Action): State => {
  switch (action.type) {
    case 'currentTodo/REMOVE':
      return null;

    case 'currentTodo/SET':
      return action.payload;

    default:
      return state;
  }
};

export const actions = { setTodo, removeTodo };
export default currentTodoReducer;
