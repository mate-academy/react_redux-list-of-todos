import { AppDispatch } from '../../app/store';
import { actions } from '../../features/todos';
import { getTodos } from '../../api';

export const getTodosThunk = () => (
  dispatch: AppDispatch,
) => {
  getTodos().then(res => {
    dispatch(actions.setTodos(res));
  });
};
