/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import classNames from 'classnames';

interface Props {
  onSelect: (id: number) => void;
  selectedTodoId: number | null;
}

export const TodoList: React.FC<Props> = ({ onSelect, selectedTodoId }) => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const visibleTodos = todos.filter(todo => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

    const matchesStatus =
      status === 'all' ||
      (status === 'completed' ? todo.completed : !todo.completed);

    return matchesQuery && matchesStatus;
  });

  return (
    <>
      {visibleTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {visibleTodos.length > 0 && (
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
            {visibleTodos.map(todo => {
              const isSelected = todo.id === selectedTodoId;

              return (
                <tr key={todo.id} data-cy="todo">
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {' '}
                    {todo.completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p
                      className={classNames({
                        'has-text-success': todo.completed,
                        'has-text-danger': !todo.completed,
                      })}
                    >
                      {todo.title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => onSelect(isSelected ? 0 : todo.id)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye': !isSelected,
                            'fa-eye-slash': isSelected,
                          })}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
