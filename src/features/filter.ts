import { Todo } from '../types/Todo';

type OnlyCompleted = {
  type: 'filter/COMPLETED',
  payload: Todo[],
};

const filterCompleted = (value: Todo[]): OnlyCompleted => ({
  type: 'filter/COMPLETED',
  payload: value,
});

type OnlyActive = {
  type: 'filter/ACTIVE',
  payload: Todo[],
};

const filterActive = (value: Todo[]): OnlyActive => ({
  type: 'filter/ACTIVE',
  payload: value,
});

type ShowAll = {
  type: 'filter/ALL',
  payload: Todo[],
};

const filterAll = (value: Todo[]): ShowAll => ({
  type: 'filter/ALL',
  payload: value,
});

type Query = {
  type: 'filter/QUERY',
  payload: Todo[],
};

const filterQuery = (value: Todo[]): Query => ({
  type: 'filter/QUERY',
  payload: value,
});

export const actions = {
  filterCompleted,
  filterActive,
  filterAll,
  filterQuery,
};

type Action = OnlyCompleted | OnlyActive | ShowAll | Query;

const filterReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'filter/COMPLETED':
      return action.payload.filter(todo => todo.completed);
    case 'filter/ACTIVE':
      return action.payload.filter(todo => !todo.completed);
    case 'filter/ALL':
      return action.payload;
    case 'filter/QUERY':
      return action.payload;
    default:
      return todos;
  }
};

export default filterReducer;
