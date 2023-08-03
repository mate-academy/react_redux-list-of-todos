import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/set',
  payload: Todo[],
};

const setTodo
= (todos: Todo[]): SetTodos => ({ type: 'todos/set', payload: todos });

const todosReducer = (
  state: Todo[] = [],
  action: SetTodos,
): Todo[] => {
  return action.type === 'todos/set' ? action.payload : state;
};

export default todosReducer;
export const actions = { setTodo };
