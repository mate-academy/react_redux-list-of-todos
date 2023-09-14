/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  currentTodo: Todo | null,
  onTodoChose: (todo: Todo) => void,
};

export const TodoList: React.FC<Props> = ({ todos, currentTodo, onTodoChose }) => {
  return (
    <>
      {todos.length === 0
        && (
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
          {todos.map(todo => (
            <tr data-cy="todo" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed
                  && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={classNames(
                  { 'has-text-danger': !todo.completed },
                )}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onTodoChose(todo)}
                >
                  <span className="icon">
                    {currentTodo?.id === todo.id
                      ? <i className="far fa-eye-slash" />
                      : <i className="far fa-eye" />}
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
