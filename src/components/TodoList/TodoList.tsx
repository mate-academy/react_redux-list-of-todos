/* eslint-disable max-len */
import React, { useMemo } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filteringTodos } from '../../app/filteringTodos';
import { Status } from '../../types/Status';
import { actions as actionsCurrentTodos } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const dispatch = useAppDispatch();
  const currrentTodo = useAppSelector(state => state.currentTodo);
  const filterTodos = useMemo(() => filteringTodos(todos, query, status as Status),
    [query, status, todos]);

  return (
    <>
      {!filterTodos.length ? (
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
              { filterTodos.map((todo) => {
                const { id, completed, title } = todo;

                return (
                  <tr data-cy="todo">
                    <td className="is-vcentered">{id}</td>
                    <td className="is-vcentered">
                      {
                        completed && (
                          <span className="icon" data-cy="iconCompleted">
                            <i className="fas fa-check" />
                          </span>
                        )
                      }
                    </td>

                    <td className="is-vcentered is-expanded">
                      <p className={cn({
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
                        onClick={() => dispatch(actionsCurrentTodos.setTodo(todo))}
                      >
                        <span className="icon">
                          <i className={cn('far', {
                            'fa-eye-slash': currrentTodo?.id === id,
                            'fa-eye': currrentTodo?.id !== id,
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
