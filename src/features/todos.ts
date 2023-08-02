import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/set',
  payload: Todo[],
};

export const setTodo
= (todos: Todo[]): SetTodos => ({ type: 'todos/set', payload: todos });

export const actions = { setTodo };

const todosReducer = (
  state: Todo[] = [],
  action: SetTodos,
): Todo[] => {
  return action.type === 'todos/set' ? action.payload : state;
};

export default todosReducer;
