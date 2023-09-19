/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const { todos } = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    if (status === 'all') {
      return matchesQuery;
    }

    if (status === 'completed') {
      return todo.completed && matchesQuery;
    }

    if (status === 'active') {
      return !todo.completed && matchesQuery;
    }

    return true;
  });

  return (
    <>
      {!filteredTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
      <table className="table is-narrow is-fullwidth">
        {filteredTodos.length ? (
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
        ) : null}
        <tbody>
          {filteredTodos.map(todo => (
            <tr key={todo.id} data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">

                {todo.completed ? (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                ) : null}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={cn({ 'has-text-success': todo.completed, 'has-text-danger': !todo.completed })}>{todo.title}</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => dispatch(actions.setTodo(todo))}
                >
                  <span className="icon">
                    <i className={cn('far', {
                      'fa-eye-slash': todo.id === currentTodo?.id,
                      'fa-eye': todo.id !== currentTodo?.id,
                    })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
