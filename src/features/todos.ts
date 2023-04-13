import { Todo } from '../types/Todo';

type State = { todos: Todo[] };
type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

const todosReducer = (
  state: State = { todos: [] },
  action: SetTodosAction,
): State => {
  switch (action.type) {
    case 'todos/SET':
      return { ...state, todos: action.payload };
    default:
      return state;
  }
};

export const actions = { setTodos };

export default todosReducer;
