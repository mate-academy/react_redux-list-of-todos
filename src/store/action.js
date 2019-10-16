export const ACTION_TYPES = {
  LOAD_TODOS: 'LOAD::TODOS',
  SET_FILTER_PATTERN: 'SET::FILTER::PATTERN',
  SET_ERROR_MESSAGE: 'ERROR::MESSAGE',
};

export const loadTodos = (todos) => ({
  type: ACTION_TYPES.LOAD_TODOS,
  payload: todos,
});

export const setFilterPattern = (pattern) => ({
  type: ACTION_TYPES.SET_FILTER_PATTERN,
  payload: pattern,
});

export const setErrorMessage = (error) => ({
  type: ACTION_TYPES.SET_ERROR_MESSAGE,
  payload: error,
});
