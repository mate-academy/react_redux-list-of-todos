import React, { useCallback } from 'react';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { actions as currentTodoActions } from '../../features/currentTodo';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const filterByStatus = (items: Todo[], itemsStatus: Status) => {
    switch (itemsStatus) {
      case 'all':
        return items;
      case 'active':
        return items.filter(todo => !todo.completed);
      case 'completed':
        return items.filter(todo => todo.completed);
      default:
        return items;
    }
  };

  const prepearedTodos = useCallback(() => {
    const filteredTodos = filterByStatus(todos, status);
    const lowerCaseQuery = query.toLowerCase();

    return filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(lowerCaseQuery),
    );
  }, [todos, status, query]);

  const setCurrentTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      {prepearedTodos().length === 0 && (
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
          {prepearedTodos().map(todo => (
            <tr key={todo.id} data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>
              {todo.completed ? (
                <td className="is-vcentered">
                  <span className="icon has-text-success">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered"> </td>
              )}
              <td className="is-vcentered is-expanded">
                <p
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
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
                    <i
                      className={classNames('far', {
                        'fa-eye': currentTodo?.id !== todo.id,
                        'fa-eye-slash': currentTodo?.id === todo.id,
                      })}
                    />
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
