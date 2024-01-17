import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'todos/SET', payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

type State = Todo[];
type Action = SetTodosAction;

export const actions = { setTodos };

const todosReducer = (
  state: State = [],
  action: Action,
): State => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
