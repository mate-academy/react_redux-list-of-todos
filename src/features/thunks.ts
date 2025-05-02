import { AppDispatch } from '../app/store';
import { getTodos } from '../api';
import { setTodos, setIsLoading } from './todosSlice';

export const loadTodosAndUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const [todos] = await Promise.all([getTodos()]);

    dispatch(setTodos(todos));
  } finally {
    dispatch(setIsLoading(false));
  }
};
