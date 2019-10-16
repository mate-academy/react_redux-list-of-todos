export const ACTION_TYPES = {
  LOAD: 'LOAD',
  HANDLE_SUCCESS: 'HANDLE_SUCCESS',
  HANDLE_ERROR: 'HANDLE_ERROR',
  HANDLE_REMOVE: 'HANDLE_REMOVE',
  HANDLE_SORT: 'HANDLE_SORT',
};

const {
  LOAD,
  HANDLE_SUCCESS,
  HANDLE_ERROR,
  HANDLE_REMOVE,
  HANDLE_SORT,
} = ACTION_TYPES;

export const startLoading = () => ({ type: LOAD });
export const handleSuccess = todosWithUsers => ({
  type: HANDLE_SUCCESS,
  todosWithUsers,
});
export const handleError = () => ({ type: HANDLE_ERROR });
export const handleRemove = id => ({
  type: HANDLE_REMOVE,
  payload: id,
});
export const handleSort = e => ({
  type: HANDLE_SORT,
  payload: e,
});
