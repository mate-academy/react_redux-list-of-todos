/* eslint-disable */
import React, { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import cn from 'classnames';
import { Status } from '../../types/Status';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const handleGetTodo = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  const getCheckQuery = useCallback(
    (str: string) => {
      return str.toUpperCase().includes(query.toUpperCase().trim());
    },
    [query],
  );

  const filteredTodos = useMemo(() => {
    return todos?.filter(todo => {
      switch (status) {
        case Status.Active:
          return !todo.completed && getCheckQuery(todo.title);

        case Status.Completed:
          return todo.completed && getCheckQuery(todo.title);

        default:
          return getCheckQuery(todo.title);
      }
    });
  }, [todos, query, status]);

  return (
    <>
      {!filteredTodos?.length && query.length > 0 ? (
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
            {filteredTodos?.map(todo => (
              <tr data-cy="todo" key={todo.id}>
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
                    className={cn('has-text-success', {
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
                    onClick={() => handleGetTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={cn(
                          'far',
                          { 'fa-eye-slash': currentTodo?.id === todo.id },
                          { 'fa-eye': currentTodo?.id !== todo.id },
                        )}
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
