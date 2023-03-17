import { FilterTrigger } from '../types/Filter';

const QUERY = 'filter/QUERY';
const TYPE = 'filter/TYPE';

type SetQueryAction = {
  type: typeof QUERY,
  payload: string,
};

type SetTypeAction = {
  type: typeof TYPE,
  payload: string,
};

type Action = SetQueryAction | SetTypeAction;

export const setQueryAction = ((query: string): SetQueryAction => ({
  type: QUERY,
  payload: query,
}));

export const setTypeAction = ((type: string): SetTypeAction => ({
  type: TYPE,
  payload: type,
}));

export const actions = { setQueryAction, setTypeAction };

const startTodoFilterTrigger: string = FilterTrigger.All;

const startTodoFilters = {
  query: '',
  status: startTodoFilterTrigger,
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
