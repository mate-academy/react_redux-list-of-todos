import { Todo } from '../types/Todo';

type PayloadType = { todos: Todo[]; query: string };
type AllFilter = { type: 'filter/ALL'; payload: PayloadType };
type ActiveFilter = { type: 'filter/ACTIVE'; payload: PayloadType };
type CompletedFilter = { type: 'filter/COMPLETED'; payload: PayloadType };

const filterAll = (todos: Todo[], query = '')
: AllFilter => ({ type: 'filter/ALL', payload: { todos, query } });
const filterActive = (todos: Todo[], query = '')
: ActiveFilter => ({ type: 'filter/ACTIVE', payload: { todos, query } });
const filterCompleted = (todos: Todo[], query = '')
: CompletedFilter => ({ type: 'filter/COMPLETED', payload: { todos, query } });

export const actions = { filterAll, filterActive, filterCompleted };

type State = Todo[] | [];
type Actions = AllFilter | ActiveFilter | CompletedFilter;

export const filterReducer = (state: State = [], action: Actions) => {
  switch (action.type) {
    case 'filter/ALL':
      return action.payload.todos
        .filter(item => item.title.includes(action.payload.query));

    case 'filter/ACTIVE':
      return action.payload.todos.filter(item => item.completed === false
        && item.title.includes(action.payload.query));

    case 'filter/COMPLETED':
      return action.payload.todos.filter(item => item.completed === true
        && item.title.includes(action.payload.query));

    default:
      return state;
  }
};

export default filterReducer;
