import { Todo } from '../types/Todo';

const TODOS = 'todos/ALL';

type AddTodos = { type: typeof TODOS, payload: Todo[] };

const addTodos = (todos: Todo[]): AddTodos => ({
  type: TODOS,
  payload: todos,
});

export const actions = { addTodos };

const todosReducer = (todoList: Todo[] = [], action: AddTodos): Todo[] => {
  if (action.type === 'todos/ALL') {
    return action.payload;
  }

  return todoList;
};

export default todosReducer;
