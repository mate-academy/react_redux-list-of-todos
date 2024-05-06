import { Todo } from '../types/Todo';

type SetTodo = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodo => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

type Action = SetTodo;
type State = Todo[];

const todosReducer = (todos: State = [], action: Action) => {
  switch (action.type) {
    case 'todos/SET':
      return [...todos, ...action.payload];
    default:
      return [...todos];
  }
};

export default todosReducer;
