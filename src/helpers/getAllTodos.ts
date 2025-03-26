import { getTodos } from '../api';
import { Todo } from '../types/Todo';

export const getAllTodos = (
  loading: (value: boolean) => void,
  callback: (data: Todo[]) => void,
) => {
  loading(true);
  getTodos()
    .then(data => callback(data))
    .finally(() => loading(false));
};
