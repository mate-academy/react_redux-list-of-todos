import { Todo } from '../types/Todo';

type Action = { type: 'todos/SET'; payload: Todo[] };
const set = (todos: Todo[]): Action => ({ type: 'todos/SET', payload: todos });

export const actions = { set };

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      if (action.payload !== undefined) {
        return action.payload;
      }

      return todos;

    default:
      return todos;
  }
};

export default todosReducer;
