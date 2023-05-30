import { Todo } from '../types/Todo';

type LoadAction = {
  type: 'todos/LOAD';
  payload: Todo[];
};

const load = (todos: Todo[]): LoadAction => ({
  type: 'todos/LOAD',
  payload: todos,
});

export const actions = { load };

const todosReducer = (todos: Todo[] = [], action: LoadAction): Todo[] => {
  switch (action.type) {
    case 'todos/LOAD':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
