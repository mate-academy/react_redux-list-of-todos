export const SET_TODOS = 'SET_TODOS';
export const TOGGLE_USER_INFO_VISIBILITY = 'SET_USER_INFO_VISIBILITY';
export const TOGGLE_USER_LOADER_VISIBILITY = 'SET_USER_LOADER_VISIBILITY';
export const TOGGLE_HAS_USER_LOADING_ERROR = 'TOGGLE_HAS_USER_LOADING_ERROR';
export const SET_USER = 'SET_USER';

export const setTodos = (todosFromServer: Todo[]) => (
  { type: SET_TODOS, payload: todosFromServer }
);

export const toggleUserLoaderVisibility = () => (
  { type: TOGGLE_USER_LOADER_VISIBILITY }
);

export const setUser = (user: User | null) => (
  { type: SET_USER, payload: user }
);

export const toggleHasUserLoadingError = () => (
  { type: TOGGLE_HAS_USER_LOADING_ERROR }
);
