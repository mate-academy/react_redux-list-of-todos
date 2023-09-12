import { Todo } from '../types/Todo';

enum Type {
  addTodos = 'todos/ADD',
}
type AddTodos = { type: Type.addTodos, payload: Todo[] };

const addTodos = (todos: Todo[]): AddTodos => (
  { type: Type.addTodos, payload: todos }
);

export const actions = { addTodos };

const todosReducer = (todos: Todo[] = [], action: AddTodos): Todo[] => {
  if (action.type === Type.addTodos) {
    return action.payload;
  }

  return todos;
};

export default todosReducer;
