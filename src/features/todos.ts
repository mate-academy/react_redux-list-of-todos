import { Todo } from '../types/Todo';

type GetTodosAction = { type: 'todos/GET', payload: Todo[] };

const getTodos = (todos: Todo[]): GetTodosAction => ({
  type: 'todos/GET',
  payload: todos,
});

export const actions = { getTodos };

type State = Todo[];
type Action = GetTodosAction;

const todosReducer = (
  state: State = [],
  action: Action,
): State => {
  switch (action.type) {
    case 'todos/GET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
