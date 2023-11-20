import { Todo } from '../types/Todo';

type State = Todo[];
type SetTodosAction = {
  type: 'todos/SET',
  payload: Todo[],
};
type Action = SetTodosAction;
const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (
  state: State = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default todosReducer;
