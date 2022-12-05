import { Todo } from '../types/Todo';

type GetTodosAction = { type: 'todos/GET', payload: Todo[] };
type Action = GetTodosAction;

const getTodos = (todos: Todo[]): GetTodosAction => ({
  type: 'todos/GET',
  payload: todos,
});

const todosReducer = (
  todos: Todo[] = [], action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/GET':
      return action.payload;

    default:
      return todos;
  }
};

export const actions = { getTodos };
export default todosReducer;
