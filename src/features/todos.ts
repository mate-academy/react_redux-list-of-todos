import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/ADD';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodos => ({
  type: 'todos/ADD',
  payload: todos,
});

export const actions = { setTodos };

const initialValue: Todo[] = [];

const todosReducer = (
  todos: Todo[] = initialValue, action: SetTodos,
): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return [...todos, ...action.payload];
    default:
      return todos;
  }
};

export default todosReducer;
