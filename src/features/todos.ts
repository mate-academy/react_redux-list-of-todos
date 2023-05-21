import { Todo } from '../types/Todo';

const ALL = 'todos/ALL';
const ACTIVE = 'todos/ACTIVE';
const COMPLETED = 'todos/COMPLETED';

type FilterAll = { type: typeof ALL } & State;
type FilterACTIVE = { type: typeof ACTIVE } & State;
type FilterCOMPLETED = { type: typeof COMPLETED } & State;
type Action = FilterAll | FilterACTIVE | FilterCOMPLETED;

type State = { query: string, todos: Todo[] };

const filterAll = (todos: Todo[], query: string): FilterAll => ({
  type: ALL,
  query,
  todos,
});

const filterActive = (todos: Todo[], query: string): FilterACTIVE => ({
  type: ACTIVE,
  query,
  todos,
});

const filterCompleted = (todos: Todo[], query: string): FilterCOMPLETED => ({
  type: COMPLETED,
  query,
  todos,
});

export const actions = { filterAll, filterActive, filterCompleted };

const todosReducer = (todoList: Todo[] = [], action: Action): Todo[] => {
  const { type, query, todos } = action;
  const input = query ? query.toLowerCase() : '';

  switch (type) {
    case 'todos/ALL':
      return todos.filter(todo => {
        return todo.title.toLowerCase().includes(input);
      });

    case 'todos/ACTIVE':
      return todos.filter(todo => {
        const { title, completed } = todo;

        return title.toLowerCase().includes(input) && !completed;
      });

    case 'todos/COMPLETED':
      return todos.filter(todo => {
        const { title, completed } = todo;

        return title.toLowerCase().includes(input) && completed;
      });

    default: return todoList;
  }
};

export default todosReducer;
