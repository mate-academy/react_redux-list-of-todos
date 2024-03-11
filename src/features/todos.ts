import { Todo } from '../types/Todo';

type AddTodos = {
  type: 'todos/Add';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): AddTodos => ({
  type: 'todos/Add',
  payload: todos,
});

type Action = AddTodos;

export const actions = { setTodos };

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/Add':
      return [...todos, ...action.payload];
    default:
      return todos;
  }
};

export default todosReducer;
