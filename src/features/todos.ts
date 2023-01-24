import { Todo } from '../types/Todo';

type LoadTodoAction = {
  type: 'todos/LOAD';
  payload: Todo[];
};

const loadTodos = (todos: Todo[]): LoadTodoAction => ({
  type: 'todos/LOAD',
  payload: todos,
});

export const todosActions = { loadTodos };

const todosReducer = (
  state: Todo[] = [],
  action: LoadTodoAction,
) : Todo[] => {
  switch (action.type) {
    case 'todos/LOAD':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
