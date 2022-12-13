import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const isSelected = (id: number) => selectedTodo?.id === id;

  const visibleTodos = useAppSelector(({ filter, todos }) => {
    const lowerQuery = filter.query.toLowerCase();

    return todos
      .filter(todo => {
        switch (filter.status) {
          case 'active':
            return !todo.completed;

          case 'completed':
            return todo.completed;

          case 'all':
          default:
            return todo;
        }
      })
      .filter(todo => todo.title.toLowerCase().includes(lowerQuery));
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
          const { id, title, completed } = todo;

          return (
            <tr
              key={id}
              data-cy="todo"
              className={classNames({
                'has-background-info-light': isSelected(id),
              })}
            >
              <td className="is-vcentered">{id}</td>

              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={classNames({
                    'has-text-danger': !completed,
                    'has-text-success': completed,
                  })}
                >
                  {title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => dispatch(
                    currentTodoActions.setTodo(todo),
                  )}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye': !isSelected(id),
                        'fa-eye-slash': isSelected(id),
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
  );
};
