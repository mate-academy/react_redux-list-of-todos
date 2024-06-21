/* eslint-disable */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const setCurrentTodo = (selectedTodo: Todo) => {
    dispatch(currentTodoSlice.actions.setCurrentTodo(selectedTodo));
  };

  return (
    <>
      {!todos.length ? (
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
            {todos.map(({ id, title, completed, userId }) => (
              <tr
                data-cy="todo"
                key={id}
                className={classNames({
                  'has-background-info-light': currentTodo?.id === id,
                })}
              >
                <td className="is-vcentered">{id}</td>

                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    {completed && <i className="fas fa-check" />}
                  </span>
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
                      setCurrentTodo({ id, title, completed, userId })
                    }
                  >
                    <span className="icon">
                      <i
                        className={classNames({
                          'far fa-eye': currentTodo?.id !== id,
                          'far fa-eye-slash': currentTodo?.id === id,
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
