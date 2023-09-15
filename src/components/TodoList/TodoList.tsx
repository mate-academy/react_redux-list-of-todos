/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { prepareTodos } from '../../utils/prepareTodos';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const preparedTodos = prepareTodos(todos, filter);

  return (
    <>
      {
        !preparedTodos.length ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )
          : (
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
                {
                  preparedTodos.map(todo => (
                    <tr
                      data-cy="todo"
                      className={classNames({
                        'has-background-info-light': selectedTodo?.id === todo.id,
                      })}
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
                          onClick={() => dispatch(actions.setTodo(todo))}
                        >
                          <span className="icon">
                            <i className={classNames(
                              'far',
                              {
                                'fa-eye-slash': selectedTodo?.id === todo.id,
                                'fa-eye': selectedTodo?.id !== todo.id,
                              },
                            )}
                            />
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
      }
    </>
  );
};
