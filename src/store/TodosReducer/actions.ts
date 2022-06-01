import { ToDo } from '../../types/ToDo';
import { User } from '../../types/User';

export const LOAD_TODOS = 'LOAD_TODOS';
export const LOAD_VISIBLE_TODOS = 'LOAD_VISIBLE_TODOS';
export const LOAD_USER = 'LOAD_USER';
export const SET_SELECTED_ID = 'SET_SELECTED_ID';
export const SET_TITLE_QUERY = 'SET_TITLE_QUERY';
export const SET_COMPLETED_QUERY = 'SET_COMPLETED_QUERY';
export const SET_IS_RANDOMIZED = 'SET_IS_RANDOMIZED';
export const SET_LOADING_ERROR = 'SET_LOADING_ERROR';
export const SET_IS_TODOS_SORTED = 'SET_IS_TODOS_SORTED';
export const FILTER_TODOS = 'FILTER_TODOS';
export const SORT_TODOS = 'SORT_TODOS';
export const RANDOMIZE_TODOS = 'RANDOMIZE_TODOS';

export const loadUserAction = (user: User | null) => ({
  type: LOAD_USER,
  user,
});

export const loadTodosAction = (todos: ToDo[]) => ({
  type: LOAD_TODOS,
  todosFromServer: todos,
});

export const setSelectedIDAction = (userID: number) => ({
  type: SET_SELECTED_ID,
  userID,
});

export const setVisibleTodosAction = (todos: ToDo[]) => ({
  type: LOAD_VISIBLE_TODOS,
  visibleTodos: todos,
});

export const setTitleQueryAction = (value: string) => ({
  type: SET_TITLE_QUERY,
  titleQuery: value,
});

export const setCompleteQueryAction = (value: string) => ({
  type: SET_COMPLETED_QUERY,
  completeQuery: value,
});

export const setIsRandomizedAction = (boolean: boolean) => ({
  type: SET_IS_RANDOMIZED,
  isRandomized: boolean,
});

export const filterTodos = () => ({
  type: FILTER_TODOS,
});

export const setLoadingErrorAction = (boolean: boolean) => ({
  type: SET_LOADING_ERROR,
  isLoadingError: boolean,
});

export const sortTodos = () => ({
  type: SORT_TODOS,
});

export const setIsTodosSortedAction = (boolean: boolean) => ({
  type: SET_IS_TODOS_SORTED,
  isTodosSorted: boolean,
});

export const randomizeTodos = () => ({
  type: RANDOMIZE_TODOS,
});
