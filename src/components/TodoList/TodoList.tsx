/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

import Todo from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId: number;
  onSelectTodoClick: (userId: number) => void;
};

const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelectTodoClick,
}) => {
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

          <th />
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': todo.id === selectedTodoId,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>

            {
              todo.completed
                ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                )
                : (
                  <td className="is-vcentered" />
                )
            }

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">{todo.title}</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                className="button"
                onClick={() => onSelectTodoClick(todo.id)}
                data-cy="selectButton"
              >
                <span className="icon">
                  <i
                    className={classNames({
                      far: true,
                      'fa-eye': todo.id !== selectedTodoId,
                      'fa-eye-slash': todo.id === selectedTodoId,
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

export default React.memo(TodoList);
