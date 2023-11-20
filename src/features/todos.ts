import { Todo } from '../types/Todo';

type Action = {
  type: 'todos/SET',
  payload: Todo[];
};

const setTodos = (todos: Todo[]): Action => ({
  type: 'todos/SET',
  payload: todos,
});

type State = Todo[];

const todosReducer = (state: State = [], action: Action): State => {
  switch (action.type) {
    case 'todos/SET':
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export const actions = { setTodos };
export default todosReducer;
