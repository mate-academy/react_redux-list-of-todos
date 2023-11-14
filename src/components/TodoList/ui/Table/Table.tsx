import { useEffect, useState } from 'react';
import { Todo } from 'types/Todo';
import { getTodos } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { actions as todosActions } from 'features/todos';
import { TableItem } from '../TableItem';

export const Table = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const setTodos = (todosFromServer: Todo[]) =>
    dispatch(todosActions.setTodos(todosFromServer));

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    getTodos()
      .then(setTodos)
      .catch()
      .finally(() => setIsloading(false));
  }, []);

  console.log(todos);

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>

          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>

          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        <TableItem />
      </tbody>
    </table>
  );
};
