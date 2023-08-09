import { Todo } from '../types/Todo';

type SetTodosAction = { type: 'todos/set'; payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/set',
  payload: todos,
});

export const actions = { setTodos };

type State = Todo[];
type Action = SetTodosAction;

const todosReducer = (
  state: State = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/set':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
