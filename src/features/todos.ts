import { Todo } from '../types/Todo';

const get = (todos: Todo[]): Action => ({ type: 'todo/GET', payload: todos });

export const actions = { get };

type Action = {
  type: 'todo/GET';
  payload: Todo[];
};

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todo/GET':
      if (action.payload !== undefined) {
        return action.payload;
      }

      return todos;

    default:
      return todos;
  }
};

export default todosReducer;
