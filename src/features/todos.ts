import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/SET',
  payload: Todo[],
};

const setTodos = (todos: Todo[]): SetTodos => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

type Action = SetTodos;

type State = Todo[];

const todosReducer = (
  state: State = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
