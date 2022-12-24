import { Todo } from '../types/Todo';

type SetTodos = { type: 'todos/Set', todos: Todo[] };
type ErrorSetTodos = { type: 'todos/Error' };
type Actions = SetTodos | ErrorSetTodos;

const setTodos = (todos: Todo[]): SetTodos => ({ type: 'todos/Set', todos });
const errorSetTodos = (): ErrorSetTodos => ({ type: 'todos/Error' });

const todosReducer = (todos: Todo[] = [], action: Actions): Todo[] => {
  switch (action.type) {
    case 'todos/Set':
      return action.todos;

    case 'todos/Error':
      return [];

    default:
      return todos;
  }
};

export const actions = { setTodos, errorSetTodos };

export default todosReducer;
