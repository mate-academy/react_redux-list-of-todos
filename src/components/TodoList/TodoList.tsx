/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const handleSelectTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const handleDeselectTodo = () => {
    dispatch(currentTodoActions.removeTodo());
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
            {todos.map(todo => {
              const { id, title, completed } = todo;

              return (
                <tr data-cy="todo">
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p className={classNames(
                      completed ? 'has-text-success' : 'has-text-danger',
                    )}
                    >
                      {title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => (
                        currentTodo?.id === id
                          ? handleDeselectTodo()
                          : handleSelectTodo(todo)
                      )}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'far',
                          (currentTodo?.id === id
                            ? 'fa-eye-slash'
                            : 'fa-eye'
                          ),
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
      )}
    </>
  );
};
