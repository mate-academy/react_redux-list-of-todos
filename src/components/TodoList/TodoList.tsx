/* eslint-disable max-len */
import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { RootState } from '../../app/store';

type Props = {
  todos: Todo[];
  handleShowTodo: (value: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleShowTodo,
}) => {
  const currentTodo = useSelector<RootState, Todo | null>(
    (state) => state.currentTodo,
  );

  return (
    <>
      {todos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {todos.map((todo) => (
            <tr data-cy="todo" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleShowTodo(todo)}
                  aria-label={`Show details for todo ${todo.title}`}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye':
                          !currentTodo
                          || (currentTodo && todo.id !== currentTodo.id),
                        'fa-eye-slash':
                          currentTodo && todo.id === currentTodo.id,
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
