import { Todo } from '../types/Todo';

type AddAction = { type: 'todos/LOADING', payload: Todo[] };
const setTodos = (todos: Todo[]) => ({ type: 'todos/LOADING', payload: todos });

export const actions = { setTodos };

const todosReducer = (todos: Todo[] = [], action: AddAction): Todo[] => {
  switch (action.type) {
    case 'todos/LOADING':
      return [...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
