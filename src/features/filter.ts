import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const setQuery = (query: string) => ({
  type: 'query' as const,
  payload: query,
});

export const setStatus = (status: Status) => ({
  type: 'status' as const,
  payload: status,
});

type Action = ReturnType<typeof setQuery> | ReturnType<typeof setStatus>;

export const actions = { setQuery, setStatus };

const filterReducer = (state: Todo[], action: Action) => {
  switch (action.type) {
    case 'query':
      return { ...state, query: action.payload };
    case 'status':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
