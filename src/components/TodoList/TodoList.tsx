/* eslint-disable max-len */
import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getVisibleTodos } from '../../app/getVisibleTodos';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const { todos, currentTodo } = useAppSelector(state => state);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const visibleTodods = useMemo(
    () => getVisibleTodos(todos, status, query),
    [todos, query, status],
  );

  if (!visibleTodods.length) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <>
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
          {visibleTodods.map(todo => {
            const { id, completed, title } = todo;
            const isSelected = currentTodo?.id === id;

            return (
              <tr
                key={id}
                data-cy="todo"
                className={classNames(
                  {
                    'has-background-info-light': isSelected,
                  },
                )}
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
                    className={classNames(
                      { 'has-text-danger': !completed },
                      { 'has-text-success': completed },
                    )}
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
                        className={classNames(
                          'far',
                          {
                            'fa-eye-slash': isSelected,
                            'fa-eye': !isSelected,
                          },
                        )}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
