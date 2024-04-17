/* eslint-disable */
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import cn from 'classnames';
import { getTodosFilter } from '../../api';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const { todos } = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const { currentTodo } = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const visibleTodos = useMemo(
    () => getTodosFilter(todos, status, query),
    [todos, status, query],
  );

  return (
    <>
      {visibleTodos.length === 0 ? (
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
            {visibleTodos.map(todo => (
              <tr data-cy="todo" key={todo.id}>
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
                    className={cn({
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
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
                    onClick={() => dispatch(actionsCurrentTodo.setTodo(todo))}
                  >
                    <span className="icon">
                      {currentTodo !== todo ? (
                        <i className="far fa-eye" />
                      ) : (
                        <i className="far fa-eye-slash" />
                      )}
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
