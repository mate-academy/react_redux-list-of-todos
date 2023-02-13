import { Status } from '../types/Status';
import { Todo } from '../types/Todo';
import { FilterOption } from './filter';

type FilteringAction = {
  type: 'filter',
  payLoad: {
    options: FilterOption,
    todosToFilter: Todo[],
  },
};

const getVisibleTodos = (
  todosToFilter: Todo[],
  options: FilterOption,
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
          case Status.Active:
            return todo.completed === false;

          case Status.Completed:
            return todo.completed === true;

          case Status.All:
          default:
            return true;
        }
      });

      return visibleTodos.filter(todo => {
        const normQuery = options.query.toLocaleLowerCase();

        return todo.title.toLocaleLowerCase().includes(normQuery);
      });
    }

    default:
      return todos;
  }
};

export default todosReducer;
