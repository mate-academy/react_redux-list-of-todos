import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

export const actions = { setTodo, removeTodo };

type CurrentTodo = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  currentTodo: CurrentTodo = null,
  action: Action,
): CurrentTodo => {
  switch (action.type) {
    case 'currentTodo/SET':
      return action.payload;

    case 'currentTodo/REMOVE':
      return null;

    default:
      return currentTodo;
  }
};

export default currentTodoReducer;
