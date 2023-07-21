import { Todo } from '../types/Todo';

export enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

type FilterType = { type: 'set/FILTER'; filter: Filter };
type QueryType = { type: 'set/QUERY'; query: string };
type FilterTodos = { type: 'set/TODOS', todos: Todo[] };

const setFilter = (filter:Filter)
: FilterType => ({ type: 'set/FILTER', filter });
const setQuery = (query:string)
: QueryType => ({ type: 'set/QUERY', query });
const setFilterTodos = (todos: Todo[])
: FilterTodos => ({ type: 'set/TODOS', todos });

export const actions = { setFilter, setQuery, setFilterTodos };

type State = {
  query: string,
  filter: Filter,
  todos: Todo[],
};
type Actions = FilterType | QueryType | FilterTodos;

export const filterReducer = (
  state: State = {
    query: '',
    filter: Filter.ALL,
    todos: [],
  },
  action: Actions,
) => {
  switch (action.type) {
    case 'set/QUERY':
      return { ...state, query: action.query };

    case 'set/FILTER':
      return { ...state, filter: action.filter };

    case 'set/TODOS':
      return { ...state, todos: action.todos };

    default:
      return state;
  }
};

export default filterReducer;
