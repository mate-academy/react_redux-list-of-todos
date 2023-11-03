/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const { todos, currentTodo, filter } = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const visibleTodos = todos.filter(todo => {
    const isQueryIncluded = todo.title.toLowerCase().includes(filter.query.toLowerCase().trim());

    switch (filter.status) {
      case 'all':
      default:
        return isQueryIncluded;
      case 'active':
        return !todo.completed && isQueryIncluded;
      case 'completed':
        return todo.completed && isQueryIncluded;
    }
  });

  return (
    <>
      {!todos.length ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
                    'has-background-info-light': id === currentTodo?.id,
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
                      onClick={() => dispatch(currentTodoActions.setTodo(todo))}
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye': id !== currentTodo?.id,
                            'fa-eye-slash': id === currentTodo?.id,
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
