import { Todo } from '../types/Todo';

type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

export const removeTodo = (): RemoveTodoAction => ({
  type: 'currentTodo/REMOVE',
});

export const setTodo = (todo: Todo): SetTodoAction => ({
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
