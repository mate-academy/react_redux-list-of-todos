import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodos => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = {
  setTodos,
};

type State = Todo[] | [];
type Action = SetTodos;

const todosReducer = (state: State = [], action: Action): State => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];

    default:
      return state;
  }
};

export default todosReducer;
