/* eslint-disable */
import React, { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const filterByStatus = useCallback((todos: Todo[], status: Status) => {
    switch (status) {
      case 'all':
        return todos;

      case 'completed':
        return todos.filter(todo => todo.completed);

      case 'active':
        return todos.filter(todo => !todo.completed);

      default:
        return todos;
    }
  }, []);

  const preparedTodos = useMemo(() => {
    const filteredTodos = filterByStatus(todos, status);
    const lowerCaseQuery = query.toLowerCase();

    return filteredTodos.filter(todo => {
      return todo.title.toLowerCase().includes(lowerCaseQuery);
    });
  }, [todos, status, query]);

  const noMatch = useMemo(() => {
    if (todos.length && !preparedTodos.length) {
      return true;
    }

    return false;
  }, [todos, preparedTodos]);

  const setCurrentTodo = useCallback(
    (todo: Todo) => dispatch(currentTodoActions.setTodo(todo)),
    [],
  );

  return (
    <>
      {noMatch && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        {(!noMatch || !todos.length) && (
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
        )}

        <tbody>
          {preparedTodos.map(todo => (
            <tr data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>

              {todo.completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered"> </td>
              )}

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
                  onClick={() => setCurrentTodo(todo)}
                >
                  <span className="icon">
                    <i className={classNames('far', {
                      'fa-eye': todo.id !== currentTodo?.id,
                      'fa-eye-slash': todo.id === currentTodo?.id,
                    })} />
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
