import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | [];
  currentTodo: Todo | null;
  handleSetCurrentTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  currentTodo,
  handleSetCurrentTodo,
}) => (
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
      {todos.map(todo => {
        const { id, title, completed } = todo;
        const isSelected = currentTodo && currentTodo.id === id;

        return (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': isSelected,
            })}
            key={id}
          >
            <td className="is-vcentered">
              {id}
            </td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
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
                onClick={() => handleSetCurrentTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={classNames(
                      'far',
                      {
                        'fa-eye-slash': isSelected,
                        'fa-eye': !isSelected,
                      },
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
