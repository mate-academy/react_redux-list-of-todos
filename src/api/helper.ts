import {
  ACTIVE_TODOS, COMPLETED_TODOS,
} from '../store/todosList';
import { InitialTodosStateT, TODOSTYPE } from './interface';

export function getFilteringTodosList(state: InitialTodosStateT) {
  const lowQuery = state.query.toLowerCase();
  let updateList: TODOSTYPE[] = [...state.todos];

  switch (state.filteringType) {
    case ACTIVE_TODOS:
      updateList = state.todos.filter(todo => !todo.completed);
      break;
    case COMPLETED_TODOS:
      updateList = state.todos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  if (state.query) {
    return updateList.filter(
      todo => todo.title && todo.title.toLowerCase().includes(lowQuery),
    );
  }

  return updateList;
}
