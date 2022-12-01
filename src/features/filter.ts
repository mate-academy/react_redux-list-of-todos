import { Todo } from '../types/Todo';

type AllFilter = { type: 'all' };
type ActiveFilter = { type: 'active' };
type CompletedFilter = { type: 'completed' };

type Action = AllFilter | ActiveFilter | CompletedFilter;

const all = (): AllFilter => ({ type: 'all' });
const active = (): ActiveFilter => ({ type: 'active' });
const completed = (): CompletedFilter => ({ type: 'completed' });

export const actions = { all, active, completed };

const filterReducer = (todos: Todo[], action: Action) => {
  switch (action.type) {
    case 'active':
      return todos.filter(todo => todo.completed === false);

    case 'completed':
      return todos.filter(todo => todo.completed === true);

    case 'all':
      return todos;

    default:
      return [];
  }

  // return {
  //   query: '',
  //   status: 'all',
  // };
};

export default filterReducer;
