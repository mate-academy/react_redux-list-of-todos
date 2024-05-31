import { Todo } from '../types/Todo';

type SetTodoAction = { type: 'currentTodo/SET'; payload: Todo };
type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

type Action = SetTodoAction | RemoveTodoAction;

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});
const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

export const actions = { setTodo, removeTodo };

type State = Todo | null;

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
