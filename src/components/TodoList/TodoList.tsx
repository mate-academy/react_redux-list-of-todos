/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React, { useCallback, useMemo } from 'react';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { filterTodos } from '../../helpers/filterTodos';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    todos,
    currentTodo,
    filter: { query, status },
  } = useAppSelector(store => store);

  const handleSelectTodo = useCallback((todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  }, [dispatch]);

  const visibleTodos = useMemo(() => {
    return filterTodos(todos, status, query);
  }, [query, status, todos]);

  return (
    <>
      {!visibleTodos.length
        ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )
        : (
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
              {
                visibleTodos.map(todo => {
                  const {
                    completed,
                    id,
                    title,
                  } = todo;

                  const isSelected = id === currentTodo?.id;

                  return (
                    <tr
                      data-cy="todo"
                      key={id}
                      className={cn({ 'has-background-info-light': isSelected })}
                    >
                      <td className="is-vcentered">{id}</td>
                      <td className="is-vcentered">
                        {completed && (
                          <span
                            className="icon"
                            data-cy="iconCompleted"
                          >
                            <i className="fas fa-check" />
                          </span>
                        )}
                      </td>

                      <td className="is-vcentered is-expanded">
                        <p
                          className={
                            completed
                              ? 'has-text-success'
                              : 'has-text-danger'
                          }
                        >
                          {title}
                        </p>
                      </td>

                      <td className="has-text-right is-vcentered">
                        <button
                          data-cy="selectButton"
                          className="button"
                          type="button"
                          onClick={() => handleSelectTodo(todo)}
                        >
                          <span className="icon">
                            <i className={
                              isSelected
                                ? 'far fa-eye-slash'
                                : 'far fa-eye'
                            }
                            />
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        )}

    </>
  );
};
