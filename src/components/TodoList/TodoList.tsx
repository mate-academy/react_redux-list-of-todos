/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as todoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { preparedTodos } from '../../utils/PreparedTodos';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);

  const addTodo = (todo: Todo) => dispatch(todoActions.setTodo(todo));

  const filterTodos = preparedTodos(filter.query, todos, filter.status);

  return (
    <>
      {filterTodos.length === 0
        ? (
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
              {filterTodos.map(todo => {
                const isSelected = todo.id === currentTodo?.id;

                return (
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
                        onClick={() => addTodo(todo)}
                      >
                        <span className="icon">
                          <i className={classNames({
                            'far fa-eye': !isSelected,
                            'far fa-eye-slash': isSelected,
                          })}
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
