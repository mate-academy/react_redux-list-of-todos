import { Todo } from '../types/Todo';

type StoreTodos = { type: 'todos/Store'; payload: Todo[] };
const SetTodos = (value: Todo[]): StoreTodos => ({
  type: 'todos/Store',
  payload: value,
});

type State = Todo[] | null;
type Action = StoreTodos;

export const actions = { SetTodos };

const todosReducer = (state: State = null, action: Action): State => {
  switch (action.type) {
    case 'todos/Store':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
