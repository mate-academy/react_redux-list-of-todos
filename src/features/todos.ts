import { Todo } from '../types/Todo';

type Actions = {
  type: 'todos/ADD';
  payload: Todo[];
};

const todosAdd = (todos: Todo[]): Actions => ({
  type: 'todos/ADD',
  payload: todos,
});

export const actions = { todosAdd };

const todosReducer = (todos: Todo[] = [], action: Actions): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
