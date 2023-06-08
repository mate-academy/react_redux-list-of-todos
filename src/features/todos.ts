import { Todo } from '../types/Todo';

type LoadAction = { type: 'todos/LOAD', payload: Todo[] };

type Action = LoadAction;

const load = (todos: Todo[]): LoadAction => ({
  type: 'todos/LOAD',
  payload: todos,
});

export const actions = { load };

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/LOAD':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
