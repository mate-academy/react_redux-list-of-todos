/* eslint-disable */
import React from 'react';
import cn from 'classnames';

import { getFilteredTodos } from '../../helpers/getFilteredTodos';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

export const TodoList: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
    const todos = useAppSelector(state => state.todos);
    const query = useAppSelector(state => state.filter.query);
    const status = useAppSelector(state => state.filter.status);
    const selectedTodo = useAppSelector(state => state.currentTodo);

    const filteredTodos = getFilteredTodos(todos, status, query);

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
        {filteredTodos.map(todo => {
          const { id, title, completed } = todo;

          return (
            <tr
              data-cy="todo"
              key={id}
              className={cn({
                'has-background-info-light': id === selectedTodo?.id,
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
                  className={cn({
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
                  onClick={() => dispatch(actions.setTodo(todo))}
                >
                  <span className="icon">
                    {id === selectedTodo?.id ? (
                      <i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
