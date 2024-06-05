import { Todo } from '../types/Todo';

type SetTodos = { type: 'todos/SET'; payload: Todo[] };

type Action = SetTodos;

export const setTodos = (todos: Todo[]): SetTodos => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
