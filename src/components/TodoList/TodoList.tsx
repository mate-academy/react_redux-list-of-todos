/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterTodos } from '../../services/filterTodos';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);
  const editedTodos = filterTodos(query, status as Status, todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const chooseTodo = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <>
      {false && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th aria-label="icon">
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th aria-label="colum"> </th>
          </tr>
        </thead>

        <tbody>
          {editedTodos.map(todo => (
            <tr
              key={todo.id}
              data-cy="todo"
            >
              <td className="is-vcentered">
                {todo.id}
              </td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>
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

              <td
                className="has-text-right is-vcentered"
                aria-label="has text"
              >
                <button
                  aria-label="button chose"
                  onClick={() => chooseTodo(todo)}
                  data-cy="selectButton"
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    <i className={`far ${selectedTodo?.id === todo.id
                      ? 'fa-eye-slash'
                      : 'fa-eye'}`}
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
