import { Todo } from '../types/Todo';
import todos from '../json/todos.json';

type FilterActionAll = { type: 'filter/ALL'; payload: string };
type FilterActionActive = { type: 'filter/ACTIVE'; payload: string };
type FilterActionCompleted = { type: 'filter/COMPLETED'; payload: string };

type Action = FilterActionAll | FilterActionActive | FilterActionCompleted;

const filterAll = (payload: string): FilterActionAll => ({
  type: 'filter/ALL',
  payload,
});
const filterActive = (payload: string): FilterActionActive => ({
  type: 'filter/ACTIVE',
  payload,
});
const filterCompleted = (payload: string): FilterActionCompleted => ({
  type: 'filter/COMPLETED',
  payload,
});

export const actionsFilter = {
  filterAll,
  filterActive,
  filterCompleted,
};

const filterReducer = (state: Todo[] | [] = todos, action: Action) => {
  switch (action.type) {
    case 'filter/ALL':
      return todos.filter(todo => todo.title.includes(action.payload));
    case 'filter/ACTIVE':
      return todos.filter(todo => {
        return todo.completed && todo.title.includes(action.payload);
      });
    case 'filter/COMPLETED':
      return todos.filter(todo => {
        return !todo.completed && todo.title.includes(action.payload);
      });
    default:
      return state;
  }
};

export default filterReducer;
