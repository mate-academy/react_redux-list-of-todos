import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as todoActions } from '../../features/currentTodo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();
  const currentTodos = useAppSelector(state => state.currentTodo);

  const handleClick = (todo: Todo) => dispatch(
    todoActions.setTodo(todo),
  );

  const isSelected = (todo: Todo) => currentTodos?.id === todo.id;

  if (!todos.length) {
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
        {todos.map(todo => (
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
                onClick={() => handleClick(todo)}
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
