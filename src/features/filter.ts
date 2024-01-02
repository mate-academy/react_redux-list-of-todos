import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

const FILTER = 'filter/query';
const COMPLETED = 'filter/completed';
const FILTER_TODOS = 'filter/todos';

type QueryAction = {
  type: 'filter/query';
  payload: string;
};

type Completed = {
  type: 'filter/completed';
  payload: Status;
};

type FilterTodosAction = {
  type: 'filter/todos';
  payload: { text: string; done: string };
};

const completedAction = (filterBy: Status): Completed => ({
  type: COMPLETED,
  payload: filterBy,
});

const queryAction = (query: string): QueryAction => ({
  type: FILTER,
  payload: query,
});

const filterTodosAction = (text: string, done: string): FilterTodosAction => ({
  type: FILTER_TODOS,
  payload: { text, done },
});

export const actions = { queryAction, completedAction, filterTodosAction };

type Action = QueryAction | Completed | FilterTodosAction;

const initialState = {
  query: '',
  status: 'all',
};

const filterReducer = (filter = initialState, action: Action) => {
  switch (action.type) {
    case FILTER:
      return {
        ...filter,
        query: action.payload,
      };
    case COMPLETED:
      return {
        ...filter,
        status: action.payload,
      };
    case FILTER_TODOS:
      return {
        ...filter,
        query: action.payload.text,
        status: action.payload.done,
      };
    default:
      return filter;
  }
};

export default filterReducer;

export const filterTodos = (text: string, done: string, todos: Todo[]) => {
  let todosToFilter = [...todos];

  if (text) {
    todosToFilter = todosToFilter.filter(todo => todo.title.toLowerCase()
      .includes(text.toLowerCase()));
  }

  switch (done) {
    case 'all':
      return todosToFilter;
    case 'active':
      return todosToFilter.filter(todo => !todo.completed);
    case 'completed':
      return todosToFilter.filter(todo => todo.completed);
    default:
      return todosToFilter;
  }
};
