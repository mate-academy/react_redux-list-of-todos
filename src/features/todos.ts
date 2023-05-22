import { Todo } from '../types/Todo';
import { SetTodos, TodosAction, TodosState } from '../types/types';

const set = (value: Todo[]): SetTodos => ({
  type: 'todos/SET',
  payload: value,
});

export const actions = { set };

const todosReducer = (
  todos: TodosState = [],
  action: TodosAction,
): TodosState => {
  switch (action.type) {
    case 'todos/SET':
      return [...todos, ...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
