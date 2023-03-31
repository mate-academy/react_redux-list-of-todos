import React, { useMemo } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getVisibleTodos } from '../../helper';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, status, query),
    [todos, status, query],
  );

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
          const { id, completed, title } = todo;

          const isCurrent = id === currentTodo?.id;

          return (
            <tr
              key={id}
              data-cy="todo"
              className={cn(
                { 'has-background-info-light': isCurrent },
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
                <p className={cn(
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
                    <i className={cn(
                      'far',
                      { 'fa-eye': !isCurrent },
                      { 'fa-eye-slash': isCurrent },
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
  );
};
