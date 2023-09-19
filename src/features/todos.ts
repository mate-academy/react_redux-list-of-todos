import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todo/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodos => ({
  type: 'todo/SET',
  payload: todos,
});

export const actions = { setTodos };

type Action = SetTodos;

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todo/SET':
      return [...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
