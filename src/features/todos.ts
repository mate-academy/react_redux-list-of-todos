import { Todo } from '../types/Todo';

type SetTodos = { type: 'todos/SET'; payload: Todo[] };
type Action = SetTodos;
type TodosState = Todo[];

const set = (value: Todo[]): SetTodos => ({
  type: 'todos/SET',
  payload: value,
});

export const actions = { set };

const todosReducer = (todos: TodosState = [], action: Action): TodosState => {
  switch (action.type) {
    case 'todos/SET':
      return [...todos, ...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
