import { Todo } from '../types/Todo';

type LoadAction = {
  type: 'todos/LOAD',
  playload: Todo[],
};

type Action = LoadAction;

const loadTodos = (todos: Todo[]): LoadAction => ({
  type: 'todos/LOAD',
  playload: todos,
});

const todosReducer = (
  todos: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/LOAD':
      return action.playload;

    default:
      return todos;
  }
};

export const actions = { loadTodos };

export default todosReducer;
