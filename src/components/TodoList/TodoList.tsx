/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  onShowTodo: (todo: Todo) => void;
  selectedTodoId: number | null;
}

export const TodoList: React.FC<Props> = ({todos, onShowTodo, selectedTodoId}) => {
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

        {todos.map(todo => {
        const { id, completed, title } = todo;

        return (
          <tr key={id} data-cy="todo">
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
                onClick={() => onShowTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={classNames({
                      'fas fa-eye-slash': selectedTodoId === id,
                      'far fa-eye': selectedTodoId !== id,
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
