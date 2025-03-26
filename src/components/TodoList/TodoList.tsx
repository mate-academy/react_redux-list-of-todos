/* eslint-disable */
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const currentTodo = useAppSelector(state => state.current);
  const dispatch = useAppDispatch();

  const visibleTodos = useMemo(() => {
    let result = [...todos];

    if (status) {
      switch (status) {
        case 'all':
          break;

        case 'completed':
          result = result.filter((el: Todo) => el.completed);
          break;

        case 'active':
          result = result.filter((el: Todo) => !el.completed);
      }
    }

    if (query) {
      result = result.filter((el: Todo) =>
        el.title.toLowerCase().includes(query.trim().toLowerCase()),
      );
    }

    return result;
  }, [todos, query, status]);

  return (
    <>
            {visibleTodos.length > 0 ? (
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
            {visibleTodos.map((todo: Todo) => {
              return (
                <tr key={todo.id} data-cy="todo">
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
                      className={classNames(
                        todo.completed ? 'has-text-success' : 'has-text-danger',
                      )}
                    >
                      {todo.title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(setCurrentTodo(todo))}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            currentTodo?.id === todo.id
                              ? 'far fa-eye-slash'
                              : 'far fa-eye',
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
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
