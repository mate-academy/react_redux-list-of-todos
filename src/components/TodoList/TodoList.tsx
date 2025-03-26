/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';
type Props = { todos: Todo[] };

export const TodoList: React.FC<Props> = ({ todos }) => {
  const getfilter = useAppSelector(state => state.filter);
  const currentModal = useAppSelector(state => state.currentTodo);
  const noFilterMatch = getfilter.query.length > 0 && todos.length === 0;
  const dispatch = useAppDispatch();
  const setModal = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };
  return (
    <>
      {noFilterMatch && (
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
          {todos.map((todo: Todo) => (
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': todo.id === currentModal?.id,
              })}
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
                  type="button"
                  onClick={() => setModal(todo)}
                >
                  <span className="icon">
                    {todo.id !== currentModal?.id ? (
                      <i className="far fa-eye" />
                    ) : (
                      <i className="far fa-eye-slash" />
                    )}
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
