import { Todo } from '../types/Todo';

type GetTodosAction = {
  type: 'todos/LOAD';
  payload: Todo[];
};

const storeTodos = (todos: Todo[]): GetTodosAction => ({
  type: 'todos/LOAD',
  payload: todos,
});

export const actions = { storeTodos };

const todosReducer = (todos: Todo[] = [], action: GetTodosAction): Todo[] => {
  switch (action.type) {
    case 'todos/LOAD':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
