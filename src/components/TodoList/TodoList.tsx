import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector((state: RootState) => state.todos);
  const { query, status } = useAppSelector((state: RootState) => state.filter);
  const currentTodo = useAppSelector((state: RootState) => state.currentTodo);

  const filtered = useMemo(() => {
    return todos.filter(t => {
      const matchesQuery = t.title.toLowerCase().includes(query.toLowerCase());

      if (!matchesQuery) {
        return false;
      }

      if (status === 'all') {
        return true;
      }

      if (status === 'completed') {
        return t.completed === true;
      }

      // status === 'active'
      return t.completed === false;
    });
  }, [query, status, todos]);

  return (
    <>
      {filtered.length === 0 && query.length > 0 ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : null}

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
          {filtered.map((todo: Todo) => (
            <tr key={todo.id} data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                <span className="icon">
                  {todo.completed && (
                    <i className="fas fa-check" data-cy="iconCompleted" />
                  )}
                  {/* <i className="fas fa-check" /> */}
                </span>
              </td>
              <td
                className={classNames(
                  'is-vcentered is-expanded',
                  todo.completed ? 'has-text-success' : 'has-text-danger',
                )}
              >
                {todo.title}
              </td>
              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button">
                  <span
                    className="icon"
                    onClick={() => dispatch(setCurrentTodo(todo))}
                  >
                    {currentTodo?.id === todo.id ? (
                      <i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
