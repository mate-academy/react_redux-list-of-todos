import { Todo } from '../types/Todo';

type Action = { type: 'todo/SET', payload: Todo[] };

const set = (newTodos: Todo[]): Action => ({
  type: 'todo/SET', payload: newTodos,
});

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todo/SET':
      return action.payload;
    default:
      return todos;
  }
};

export const actions = { set };
export default todosReducer;
