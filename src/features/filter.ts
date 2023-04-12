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
      return (
        action.query === ''
          ? action.todos
          : [...action.todos].filter(todo => (
            todo.title.toLowerCase().includes(action.query.toLowerCase())
          ))
      );

    case 'active':
    case 'completed':
      return [...action.todos].filter(todo => {
        if (action.type === 'active') {
          return (
            todo.completed
            && todo.title.toLowerCase().includes(action.query.toLowerCase())
          );
        }

        return (
          !todo.completed
          && todo.title.toLowerCase().includes(action.query.toLowerCase())
        );
      });

    default:
      return state;
  }
};

export default filterReducer;
