/* eslint-disable */
import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { actions as currTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currTodo = useAppSelector(state => state.currentTodo);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const getVisibleTodos = useCallback((todos: Todo[], status: Status, search: string) => {
    let visibleTodos = todos;

    switch (status) {
      case 'active':
        visibleTodos = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        visibleTodos = todos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (search) {
      visibleTodos = visibleTodos.filter(todo =>
        todo.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return visibleTodos;
  }, [])

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, status, query),
    [status, query],
  );

  return (
    <>
      {(query !== '' || status !== 'all') && !visibleTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!!visibleTodos.length && (
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
            {visibleTodos.map(todo => {
              const { id, title, completed } = todo;

              return (
                <tr data-cy="todo" key={id}>
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
                      className={classNames({
                        'has-text-danger': !completed,
                        'has-text-success': completed,
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
                      onClick={() => dispatch(currTodoActions.setTodo(todo))}
                    >
                      <span className="icon">
                        {currTodo && currTodo.id === todo.id ? (
                          <i className="far fa-eye-slash" />
                        ) : (
                          <i className="far fa-eye" />
                        )}
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
