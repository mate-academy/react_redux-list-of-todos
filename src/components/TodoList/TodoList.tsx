/* eslint-disable */
import { useAppSelector } from '../../app/hooks';
import { useMemo } from 'react';
import { filterTodos } from '../../utils/filterTodos';
import { Todo } from '../Todo';

export const TodoList = () => {
  const filter = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);

  const filteredTodos = useMemo(
    () => filterTodos(todos, filter),
    [todos, filter],
  );

  return (
    <>
      {filteredTodos.length > 0 ? (
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
            {filteredTodos.map(todo => (
              <Todo todo={todo} key={todo.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
