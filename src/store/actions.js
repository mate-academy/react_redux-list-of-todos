import {
  HANDLE_ERROR, HANDLE_SUCCESS, START_LOADING, HANDLE_DELETE,
} from './consts';

export const startLoading = () => ({ type: START_LOADING });
export const handleError = () => ({ type: HANDLE_ERROR });
export const handleSuccess = preparedTodos => ({
  type: HANDLE_SUCCESS,
  preparedTodos,
});
export const deleteTodo = itemId => ({
  type: HANDLE_DELETE,
  itemId,
});
