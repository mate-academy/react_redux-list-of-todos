import { Todo } from '../types/Todo';

type LoadAction = { type: 'todos/LOAD', payload: Todo[] };

type Actions = LoadAction;

const load = (newTodos: Todo[]): LoadAction => ({
  type: 'todos/LOAD',
  payload: newTodos,
});

export const actions = { load };

const todosReducer = (
  todos: Todo[] = [],
  action: Actions,
): Todo[] => {
  switch (action.type) {
    case 'todos/LOAD':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
