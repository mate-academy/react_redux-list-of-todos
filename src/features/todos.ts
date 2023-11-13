import { Todo } from '../types/Todo';

type SetTodos = { type: 'todos/SET', payload: Todo[] };
type Action = SetTodos;
type State = Todo[];

const setTodos = (value: Todo[]): SetTodos => (
  { type: 'todos/SET', payload: value });

const todosReducer = (
  state: State = [],
  action: Action,
): State => {
  switch (action.type) {
    case 'todos/SET':
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export const actions = { setTodos };
export default todosReducer;
