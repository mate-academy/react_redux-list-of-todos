import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as todoActions } from '../../features/currentTodo';
import { Filter } from '../../types/Filter';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const currentTodos = useAppSelector(state => state.currentTodo);

  const isSelected = (todo: Todo) => currentTodos?.id === todo.id;

  const activeTodos = useAppSelector(({ filter, todos }) => {
    if (filter.status === Filter.all && !filter.query) {
      return todos;
    }

    const lowQuery = filter.query.toLocaleLowerCase();

    return todos.filter(todo => {
      if (filter.status === Filter.active && todo.completed) {
        return false;
      }

      if (filter.status === Filter.completed && !todo.completed) {
        return false;
      }

      return todo.title.toLocaleLowerCase().includes(lowQuery);
    });
  });

  if (activeTodos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <table
      className="table is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i
                className="fas fa-check"
                aria-label="Mute volume"
              />
            </span>
          </th>
          <th>Title</th>
          <th aria-label="Mute volume"> </th>
        </tr>
      </thead>

      <tbody>
        {activeTodos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': isSelected(todo),
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td
                className="is-vcentered"
                aria-label="Mute volume"
              >
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td
                className="is-vcentered"
                aria-label="Mute volume"
              />
            )}

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">delectus aut autem</p>
            </td>

            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
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
                aria-label="Mute volume"
                type="button"
                onClick={() => dispatch(
                  todoActions.setTodo(todo),
                )}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye': !isSelected(todo),
                    'fa-eye-slash': isSelected(todo),
                  })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
