import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const visibleTodos = todos.filter(todo => {
    const normalizedTitle = todo.title.toLowerCase();
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery = normalizedTitle.includes(normalizedQuery);

    if (status === 'active') {
      return !todo.completed && matchesQuery;
    }

    if (status === 'completed') {
      return todo.completed && matchesQuery;
    }

    return matchesQuery;
  });

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
          const isSelected = currentTodo?.id === todo.id;

          return (
            <tr key={todo.id} data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td
                className={classNames('is-vcentered', {
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.title}
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  type="button"
                  className={classNames('button', {
                    'is-link': isSelected,
                  })}
                  onClick={() => {
                    if (isSelected) {
                      dispatch(setCurrentTodo(null));
                    } else {
                      dispatch(setCurrentTodo(todo));
                    }
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
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
  );
};
