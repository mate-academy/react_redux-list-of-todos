import { Todo } from '../types/Todo';

type Action = { type: 'add/todos'; payload: Todo[] };

const addTodos = (todos: Todo[]) => ({ type: 'add/todos', payload: todos });

export const actions = { addTodos };

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'add/todos':
      return [...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
