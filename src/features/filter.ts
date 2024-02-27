import { RootState } from '../types/RootStae';
import { Todo } from '../types/Todo';

type SetQueryAction = { type: 'SET_QUERY'; payload: string };
type SetStatusAction = {
  type: 'SET_STATUS';
  payload: 'all' | 'active' | 'completed';
};
type SetClearAction = { type: 'CLEAR' };
type SetFilteredAction = { type: 'SET_FILTERED'; payload: Todo[] };

export type Action =
  | SetQueryAction
  | SetStatusAction
  | SetClearAction
  | SetFilteredAction;

export const setQuery = (query: string) => ({
  type: 'SET_QUERY',
  payload: query,
});
export const setStatus = (status: 'all' | 'active' | 'completed') => ({
  type: 'SET_STATUS',
  payload: status,
});
export const setClear = () => ({ type: 'CLEAR' });
export const setFilteredTodos = (todos: Todo[]) => ({
  type: 'SET_FILTERED',
  payload: todos,
});

export const actions = { setQuery, setStatus, setClear, setFilteredTodos };

const initialState = { query: '', status: 'all', filteredTodos: [] as Todo[] };

const filterReducer = (
  state = initialState,
  action: Action,
): typeof initialState => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'CLEAR':
      return { ...initialState };
    case 'SET_FILTERED':
      return { ...state, filteredTodos: action.payload as Todo[] };
    default:
      return state;
  }
};

export const selectFilter = (state: RootState) => state.filter;

export default filterReducer;
