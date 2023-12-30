import { Todo } from '../types/Todo';

type GetTodosAction = {
  type: 'todos/GET';
  payload: Todo[];
};

const getTodos = (todos: Todo[]): GetTodosAction => ({
  type: 'todos/GET',
  payload: todos,
});

export const actions = { getTodos };

const todosReducer = (
  todos = [],
  action: GetTodosAction,
): Todo[] => {
  switch (action.type) {
    case 'todos/GET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
