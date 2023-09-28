import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todo/SET';
  payload: Todo[];
};

type Action = SetTodos;

const setTodos = (todos: Todo[]): SetTodos => ({
  type: 'todo/SET', payload: todos,
});

export const actions = { setTodos };

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todo/SET':
      return [...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
