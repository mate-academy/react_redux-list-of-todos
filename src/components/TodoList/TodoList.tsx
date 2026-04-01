import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hook';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed);

      const matchesText = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesStatus && matchesText;
    });
  }, [todos, status, query]);

  return (
    <>
      {filteredTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {filteredTodos.map(todo => {
            const isSelected = selectedTodo?.id === todo.id;

            return (
              <tr
                key={todo.id}
                data-cy="todo"
                className={classNames({
                  'has-background-success-light': todo.completed,
                })}
              >
                <td className="is-vcentered">{todo.id}</td>

                <td className="is-vcentered">
                  {todo.completed && (
                    <span
                      data-cy="iconCompleted"
                      className="icon has-text-success"
                    >
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td
                  className={classNames('is-vcentered is-expanded', {
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  })}
                >
                  {todo.title}
                </td>

                <td className="has-text-right is-vcentered">
                  {isSelected ? (
                    <button
                      data-cy="hideButton"
                      className="button"
                      type="button"
                      onClick={() =>
                        dispatch(currentTodoSlice.actions.delete())
                      }
                    >
                      <span className="icon">
                        <i className="fas fa-eye-slash" />
                      </span>
                    </button>
                  ) : (
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() =>
                        dispatch(currentTodoSlice.actions.add(todo))
                      }
                    >
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
