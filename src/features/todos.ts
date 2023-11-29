import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/LOAD';
  payload: Todo[];
};

const loadTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/LOAD',
  payload: todos,
});

type Action = SetTodosAction;

export const actions = { loadTodos };

const todosReducer = (
  state: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/LOAD':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
