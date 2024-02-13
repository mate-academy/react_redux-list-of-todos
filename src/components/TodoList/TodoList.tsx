/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as todoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const isSelected = (todo: Todo) => selectedTodo?.id === todo.id;

  const visibleTodos = useAppSelector(({ filter, todos }) => {
    if (filter.status === 'all' && !filter.query) {
      return todos;
    }

    const lowerQuery = filter.query.toLocaleLowerCase();

    return todos.filter(todo => {
      if (filter.status === 'active' && todo.completed) {
        return false;
      }

      if (filter.status === 'completed' && !todo.completed) {
        return false;
      }

      return todo.title.toLocaleLowerCase().includes(lowerQuery);
    });
  });

  if (visibleTodos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>

          <th>Title</th>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {visibleTodos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': isSelected(todo),
            })}
          >
            <td className="is-vcentered">{todo.id}</td>

            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <td className="has-text-right is-vcentered">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => dispatch(
                  todoActions.setTodo(todo),
                )}
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye': !isSelected(todo),
                      'fa-eye-slash': isSelected(todo),
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
