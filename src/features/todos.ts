import { Todo } from '../types/Todo';

type SetTodos = { type: 'todos/SET', payload: Todo[] };

const set = (todos: Todo[]): SetTodos => (
  { type: 'todos/SET', payload: todos });

export const actions = { set };

const todosReducer = (todos: Todo[] = [], action: SetTodos): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
