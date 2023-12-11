import { Todo } from '../types/Todo';

type LoadAction = {
  type: 'todos/LOAD',
  payload: Todo[]
};

const loadTodos = (todos: Todo[]): LoadAction => ({
  type: 'todos/LOAD',
  payload: todos,
});

type Action = LoadAction;

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/LOAD':
      return action.payload;

    default:
      return todos;
  }
};

export const actions = { loadTodos };

export default todosReducer;
