import { FilterStatus } from '../types/Filter';

type SetQueryAction = {
  type: 'filter/QUERY',
  payload: string,
};

type SetFilterAction = {
  type: 'filter/TYPE',
  payload: string,
};

type Action = SetQueryAction | SetFilterAction;

export const setQueryAction = ((query: string): SetQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
}));

export const setFilterTypeAction = ((type: string): SetFilterAction => ({
  type: 'filter/TYPE',
  payload: type,
}));

export const actions = { setQueryAction, setFilterTypeAction };

const startTodoFilterStatus: string = FilterStatus.All;

const startTodoFilters = {
  query: '',
  status: startTodoFilterStatus,
};

const filterReducer = (todoFilters = startTodoFilters, action: Action) => {
  switch (action.type) {
    case 'filter/QUERY':
      return {
        ...todoFilters,
        query: action.payload,
      };

    case 'filter/TYPE':
      return {
        ...todoFilters,
        status: action.payload,
      };

    default:
      return {
        ...todoFilters,
      };
  }
};

export default filterReducer;
