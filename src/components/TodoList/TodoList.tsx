/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const todos = useSelector<RootState, Todo[]>(state => state.todos);
  const currentTodo = useSelector<RootState>(state => state.currentTodo);

  console.log(todos);
  return (
    <>
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>

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
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
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
                <button data-cy="selectButton" className="button" type="button">
                  <span className="icon">
                    {/* fa-eye-slash */}
                    <i
                      className={classNames('far', { 'fa-eye': !currentTodo })}
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
