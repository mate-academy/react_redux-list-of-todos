import { Status } from '../types/Status';
import { Todo } from '../types/Todo';
import { FilterOptions } from './filter';

export const actions = {};
type FilteringAction = {
  type: 'filter',
  payLoad: {
    options: FilterOptions,
    todosToFilter: Todo[],
  },
};

const getVisibleTodos = (
  todosToFilter: Todo[],
  options: FilterOptions,
): FilteringAction => ({
  type: 'filter',
  payLoad: {
    options,
    todosToFilter,
  },

});

export const todosActions = { getVisibleTodos };

const todosReducer = (
  todos: Todo[] = [],
  action: FilteringAction,
): Todo[] => {
  switch (action.type) {
    case 'filter': {
      const { options, todosToFilter } = action.payLoad;
      const visibleTodos = todosToFilter.filter(todo => {
        switch (options.status) {
          case Status.ACTIVE:
            return todo.completed === false;

          case Status.COMPLETED:
            return todo.completed === true;

          case Status.ALL:
          default:
            return true;
        }
      });

      return visibleTodos.filter(todo => {
        const normQuery = options.query.toLocaleLowerCase().trim();

        return todo.title.toLocaleLowerCase().includes(normQuery);
      });
    }

    default:
      return todos;
  }
};

export default todosReducer;
