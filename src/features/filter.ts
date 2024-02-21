import { Todo } from '../types/Todo';
import todos from '../json/todos.json';

type FilterActionAll = { type: 'filter/ALL' };
type FilterActionActive = { type: 'filter/ACTIVE' };
type FilterActionCompleted = { type: 'filter/COMPLETED' };
type FilterActionQuery = { type: 'filter/QUERY'; payload: string };

type Action =
  | FilterActionAll
  | FilterActionActive
  | FilterActionCompleted
  | FilterActionQuery;

const filterAll = (): FilterActionAll => ({ type: 'filter/ALL' });
const filterActive = (): FilterActionActive => ({ type: 'filter/ACTIVE' });
const filterCompleted = (): FilterActionCompleted => ({
  type: 'filter/COMPLETED',
});

const filterQuery = (payload: string): FilterActionQuery => ({
  type: 'filter/QUERY',
  payload,
});

export const actionsFilter = {
  filterAll,
  filterActive,
  filterCompleted,
  filterQuery,
};

const filterReducer = (state: Todo[] | [] = todos, action: Action) => {
  switch (action.type) {
    case 'filter/ALL':
      return todos;
    case 'filter/ACTIVE':
      return todos.filter(todo => !todo.completed);
    case 'filter/COMPLETED':
      return todos.filter(todo => todo.completed);
    case 'filter/QUERY':
      return state.filter(todo => todo.title.includes(action.payload));
    default:
      return state;
  }
};

export default filterReducer;
