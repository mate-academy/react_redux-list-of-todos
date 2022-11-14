import { Todo } from '../types/Todo';

type AddAction = {
  type: 'todos/LOAD';
  payload: Todo[]
};

const load = (todos: Todo[]): AddAction => ({
  type: 'todos/LOAD',
  payload: todos,
});

export const actions = { load };

const todosReducer = (todos: Todo[] = [], action: AddAction): Todo[] => {
  switch (action.type) {
    case 'todos/LOAD':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
