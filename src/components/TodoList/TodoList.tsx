/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | null,
  selectedTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({ todos, selectedTodo }) => {
  const dispatch = useDispatch();

  return (
    <>
      {!todos && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {todos && (
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
              <tr
                data-cy="todo"
                key={todo.id}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p className={classNames({
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
                    onClick={() => dispatch(actions.setTodo(todo))}
                  >
                    {todo.id === selectedTodo?.id ? (
                      <span className="icon">
                        <i className="far fa-eye-slash" />
                      </span>
                    ) : (
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
