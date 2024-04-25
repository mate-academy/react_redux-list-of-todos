import { Todo } from '../types/Todo';
import type { Actions, SetAction } from '../types/TodoActions';

const set = (todos: Todo[]): SetAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { set };

const todosReducer = (todos: Todo[] = [], action: Actions): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];
    default:
      return todos;
  }
};

export default todosReducer;
