import React, { useMemo } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { actions as currentTodoActions } from '../../features/currentTodo';

import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos: Todo[] = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleCurrentTodo = (todo: Todo) => () => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const title = todo.title.toLowerCase();
      const trimedQuery = query.trim().toLowerCase();

      switch (status) {
        case Status.Completed:
          return todo.completed && title.includes(trimedQuery);

        case Status.Active:
          return !todo.completed && title.includes(trimedQuery);

        default:
          return todo && title.includes(trimedQuery);
      }
    });
  }, [query, status, todos]);

  return (
    <>
      {!!todos.length && (
        !visibleTodos.length ? (
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
              {visibleTodos.map(todo => (
                <tr data-cy="todo" key={todo.id}>
                  <td className="is-vcentered">
                    {todo.id}
                  </td>

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
                      onClick={handleCurrentTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            'far',
                            (todo.id === currentTodo?.id)
                              ? 'fa-eye-slash'
                              : 'fa-eye',
                          )}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </>
  );
};
