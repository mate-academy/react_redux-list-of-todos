import { FilterStatus, Status } from '../types/Status';

type State = {
  filterStatus: Status;
  query: string;
};

type FilterTodosAction = {
  type: 'FILTER_TODOS';
  payload: {
    filterStatus: Status;
  };
};

type FilterTodosByQuery = {
  type: 'FILTER_TODOS_BY_QUERY';
  payload: {
    query: string;
  };
};

type ClearQueryAction = {
  type: 'CLEAR_QUERY';
};

type Action = FilterTodosAction | FilterTodosByQuery | ClearQueryAction;

const filterTodos = (
  filterStatus: Status,
): FilterTodosAction => ({
  type: 'FILTER_TODOS',
  payload: {
    filterStatus,
  },
});

const filterTodosByQuery = (
  query: string,
): FilterTodosByQuery => ({
  type: 'FILTER_TODOS_BY_QUERY',
  payload: {
    query,
  },
});

const clearQuery = (): ClearQueryAction => ({
  type: 'CLEAR_QUERY',
});

export const actions = {
  filterTodos,
  filterTodosByQuery,
  clearQuery,
};

const filterReducer = (
  state: State = {
    filterStatus: FilterStatus.All,
    query: '',
  },
  action: Action,
): State => {
  switch (action.type) {
    case 'FILTER_TODOS':
      return {
        ...state,
        filterStatus: action.payload.filterStatus,
      };

    case 'FILTER_TODOS_BY_QUERY':
      return {
        ...state,
        query: action.payload.query,
      };

    case 'CLEAR_QUERY':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default filterReducer;
