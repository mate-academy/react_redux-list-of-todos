/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

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
            {todos.map((todo) => {
              const { id, completed, title } = todo;

              return (
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
                      className={classNames(
                        { 'has-text-danger': !completed },
                        { 'has-text-success': completed },
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
                      onClick={() => {
                        dispatch(currentTodoActions.setTodo(todo));
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            {
                              'far fa-eye-slash': currentTodo?.id === id,
                            },
                            {
                              'far fa-eye': currentTodo?.id !== id,
                            },
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
