import { Todo } from '../types/Todo';

type GetTodosActions = {
  type: 'todos/GET',
  payload: Todo[],
};

const setTodos = (todos: Todo[]): GetTodosActions => (
  { type: 'todos/GET', payload: todos }
);

export const actions = { setTodos };

const todosReducer = (todos: Todo[] = [], action: GetTodosActions): Todo[] => {
  switch (action.type) {
    case 'todos/GET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
