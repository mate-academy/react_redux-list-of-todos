import { filterTodos } from '../helper/filterTodos';
import { Todo } from '../types/Todo';

const filter = (todos: Todo[], type: string, query: string) => ({
  todos,
  type,
  query,
});

export const actions = {
  filter,
};

type Action = {
  todos: Todo[],
  type: string,
  query: string,
};

const filterReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'all':
    case 'active':
    case 'completed':
      return filterTodos(action.todos, action.type, action.query);

    default:
      return state;
  }
};

export default filterReducer;
