import { Todo } from '../types/Todo';

type SetTodos = { type: 'todos/SET', payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodos => ({
  type: 'todos/SET', payload: todos,
});

export const actions = { setTodos };

const todosReducer = (todos: Todo[] = [], action: SetTodos): Todo[] => {
  switch (action.type) {
    case 'todos/SET': {
      return [...action.payload];
    }

    default:
      return todos;
  }
};

export default todosReducer;
