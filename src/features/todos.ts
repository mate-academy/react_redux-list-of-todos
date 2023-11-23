import { Todo } from '../types/Todo';

type SetTodos = { type: 'todos/SET', payload: Todo[] };
type Actions = SetTodos;

const setTodos = (todos: Todo[]): SetTodos => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (
  todos: Todo[] = [],
  action: Actions,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...todos, ...action.payload];
    default:
      return [...todos];
  }
};

export default todosReducer;
