import { Todo } from '../types/Todo';

type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

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

export const currentTodoActions = { setTodo, removeTodo };
export default currentTodoReducer;
