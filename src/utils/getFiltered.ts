import { State as FilteredState } from '../features/filter';
import { Todo } from '../types/Todo';

export const getFiltered = (arr: Todo[], state: FilteredState) => {
  const { query, status } = state;
  let givenTodos = [...arr];

  if (status) {
    switch (status) {
      case 'active':
        givenTodos = givenTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        givenTodos = givenTodos.filter(todo => todo.completed);
        break;
      default:
        givenTodos = [...arr];
    }
  }

  if (query) {
    givenTodos = givenTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return givenTodos;
};
