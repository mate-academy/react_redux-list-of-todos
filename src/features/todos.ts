import { Todo } from '../types/Todo';

type AddTodos = { type: 'todos/ADD', payload: Todo[] };

const addTodos = (todos: Todo[]): AddTodos => (
  { type: 'todos/ADD', payload: todos }
);

export const actions = { addTodos };

const todosReducer = (todos: Todo[] = [], action: AddTodos): Todo[] => {
  if (action.type === 'todos/ADD') {
    return action.payload;
  }

  return todos;
};

export default todosReducer;
