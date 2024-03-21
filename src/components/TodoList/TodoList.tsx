/* eslint-disable */
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getFilteredTodos } from '../../helpers/getFilteredTodos';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const setCurrentTodo = (todo: Todo) =>
    dispatch(currentTodoActions.setTodo(todo));

  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, { query, status }),
    [todos, query, status],
  );

  return (
    <>
      {filteredTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {filteredTodos.length !== 0 && (
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
            {filteredTodos.map(todo => {
              const { id, title, completed } = todo;
              const isSelectedTodo = currentTodo?.id === id;

              return (
                <tr
                  data-cy="todo"
                  className={classNames({
                    'has-background-info-light': isSelectedTodo,
                  })}
                  key={id}
                >
                  <td className="is-vcentered">{id}</td>
                  {todo.completed ? (
                    <td className="is-vcentered">
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    </td>
                  ) : (
                    <td className="is-vcentered" />
                  )}
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
                      onClick={() => setCurrentTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={
                            isSelectedTodo ? 'far fa-eye-slash' : 'far fa-eye'
                          }
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
