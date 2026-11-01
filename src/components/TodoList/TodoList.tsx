import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodos } from '../../features/currentTodo';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const visibleTodos = todos.filter(todo => {
    const match = todo.title.toLowerCase().includes(query.trim().toLowerCase());

    switch (status) {
      case 'active':
        return match && !todo.completed;

      case 'completed':
        return match && todo.completed;
      default:
        return match;
    }
  });

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
            return (
              <tr
                data-cy="todo"
                key={todo.id}
                className={classNames({
                  'has-background-info-light': currentTodo?.id === todo.id,
                })}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {' '}
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
                      'has-text-success': todo.completed,
                      'has-text-danger': !todo.completed,
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
                    onClick={() => dispatch(setCurrentTodos(todo))}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye-slash': currentTodo?.id === todo.id,
                          'fa-eye': currentTodo?.id !== todo.id,
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
