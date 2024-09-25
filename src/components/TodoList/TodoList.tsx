/* eslint-disable */

import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import classNames from 'classnames';
import { setCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { FilterStatus } from '../../features/filter';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const currentTodo = useSelector((state: RootState) => state.currentTodo.todo);
  const { query, status } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  const filterTodos = (query: string, status: FilterStatus, todos: Todo[]) => {
    return todos.filter(todo => {
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus =
        status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed);

      return matchesQuery && matchesStatus;
    });
  };

  const visibleTodos = useMemo(() => {
    return filterTodos(query, status, todos);
  }, [query, status, todos]);

  if (!todos) {
    return null;
  }

  const handleSetTodo = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };

  const noVisibleTodos = !visibleTodos.length;

  return (
    <>
      {noVisibleTodos && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!noVisibleTodos && (
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
            {visibleTodos.map(todo => (
              <tr
                key={todo.id}
                data-cy="todo"
                className={classNames('', {
                  'has-background-info-light': todo.id === currentTodo?.id,
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
                  <p
                    className={classNames('', {
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
                    onClick={() => handleSetTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': todo.id !== currentTodo?.id,
                          'fa-eye-slash': todo.id === currentTodo?.id,
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
