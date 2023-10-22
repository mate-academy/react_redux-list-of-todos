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

export const actions = { setTodo, removeTodo };

type CurrentTodo = Todo | null;
type CurrentTodoAction = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  currentTodo: CurrentTodo = null,
  action: CurrentTodoAction,
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
