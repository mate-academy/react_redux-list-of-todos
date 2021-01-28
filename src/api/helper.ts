import {
  ACTIVE_TODOS, COMPLETED_TODOS,
} from '../store/navMenuTodo';
import { NavType, TODOSTYPE } from './interface';

export function getFilteringTodosList(todos: TODOSTYPE[], action: NavType) {
  const lowQuery = action.query.toLowerCase();
  let updateList: TODOSTYPE[] = [...todos];

  switch (action.filteringType) {
    case ACTIVE_TODOS:
      updateList = todos.filter(todo => todo.completed === false);
      break;
    case COMPLETED_TODOS:
      updateList = todos.filter(todo => todo.completed === true);
      break;
    default:
      break;
  }

  if (action.query) {
    return updateList.filter(
      todo => todo.title && todo.title.toLowerCase().includes(lowQuery),
    );
  }

  return updateList;
}
