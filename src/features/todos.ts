import { Todo } from '../types/Todo';

type StoreTodos = { type: 'todos/Store'; payload: Todo[] };
const setTodos = (value: Todo[]): StoreTodos => ({
  type: 'todos/Store',
  payload: value,
});

type State = Todo[] | null;
type Action = StoreTodos;

export const actions = { setTodos };

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state: State = null, action: Action): State => {
  switch (action.type) {
    case 'todos/Store':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
