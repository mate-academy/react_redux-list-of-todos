/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { actions as currentActions } from '../../features/currentTodo';
import { getFilteredTodos } from '../../features/getFilteresTodos';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector(state => state.todos);
  const { currentTodo } = useAppSelector(state => state.currentTodo);
  const { status } = useAppSelector(state => state.filter);
  const { query } = useAppSelector(state => state.filter);

  const filteredTodos = getFilteredTodos(todos, status, query);

  return (
    <>
      {filteredTodos.length === 0 ? (
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
            {filteredTodos.map(todo => (
              <tr data-cy="todo" className="" key={todo.id}>
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
                    onClick={() => dispatch(currentActions.setTodo(todo))}
                  >
                    <span className="icon">
                      <i
                        className={classNames({
                          'far fa-eye': todo.id !== currentTodo?.id,
                          'far fa-eye-slash': todo.id === currentTodo?.id,
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
