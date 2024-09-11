import { getTodos } from '../api';
import { AppDispatch } from '../app/store';
import { fetchError, fetchStart, fetchSuccess } from '../features/todos';

export const fetchTodos = () => async (dispatch: AppDispatch) => {
  dispatch(fetchStart());

  try {
    const todos = await getTodos();

    dispatch(fetchSuccess(todos));
  } catch (error) {
    dispatch(fetchError(`${error}`));
  }
};
