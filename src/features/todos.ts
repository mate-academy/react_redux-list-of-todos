import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/SET';
  payload: {
    todos: Todo[];
  };
};

const setTodos = (todos: Todo[]): SetTodos => ({
  type: 'todos/SET',
  payload: {
    todos,
  },
});

export const actions = { setTodos };

type State = Todo[] | [];
type Action = SetTodos;

const todosReducer = (todos:State = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload.todos];
    default:
      return todos;
  }
};

export default todosReducer;
