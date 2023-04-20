/* eslint-disable max-len */
import React, { useMemo } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodosActions } from '../../features/currentTodo';
import { getVisibleTodos } from '../../utils/getVisibleTodos';

export const TodoList: React.FC = () => {
  const { todos, currentTodo } = useAppSelector(state => state);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, status, query),
    [todos, query, status],
  );

  if (!visibleTodos.length) {
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
          {visibleTodos.map(todo => {
            const { id, title, completed } = todo;
            const isSelected = currentTodo?.id === id;

            return (
              <tr
                data-cy="todo"
                className={cn({
                  'has-background-info-light': isSelected,
                })}
                key={id}
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
                    className={cn({
                      'has-text-success': completed,
                      'has-text-danger': !completed,
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
                    onClick={() => dispatch(currentTodosActions.setTodo(todo))}
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
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
    </>
  );
};
