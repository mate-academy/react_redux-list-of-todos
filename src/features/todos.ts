import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (value: Todo[]): SetTodos => ({
  type: 'todos/SET',
  payload: value,
});

export const actions = { setTodos };

type State = Todo[] | null;
type Action = SetTodos;

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state: State = null, action: Action): State => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
