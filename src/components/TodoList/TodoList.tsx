/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import classNames from 'classnames';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const { query, status } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  const filteredTodos = todos
    .filter(({ completed }) => {
      switch (status) {
        case 'active':
          return !completed;

        case 'completed':
          return completed;

        default:
          return true;
      }
    })
    .filter(({ title }) => {
      if (query) {
        return title.toLowerCase().includes(query.toLowerCase());
      }

      return true;
    });

  return (
    <>
      {!filteredTodos.length ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
            {filteredTodos.map(({ id, title, userId, completed }) => (
              <tr
                data-cy="todo"
                className={classNames({
                  'has-background-info-light': id === currentTodo?.id,
                })}
                key={id}
              >
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
                    onClick={() =>
                      dispatch(
                        currentTodoSlice.actions.setCurrentTodo({
                          id,
                          title,
                          userId,
                          completed,
                        }),
                      )
                    }
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye-slash': id === currentTodo?.id,
                          'fa-eye': id !== currentTodo?.id,
                        })}
                      />
                    </span>
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
