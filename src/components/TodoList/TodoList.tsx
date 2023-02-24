import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todoList = useAppSelector(state => state.todos);
  const openedTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const queryFilter = filter.query.toLowerCase();
  const dispatch = useAppDispatch();
  const setTodo = (value: Todo) => dispatch(actions.setTodo(value));

  const filterTodos = useCallback(() => {
    switch (filter.status) {
      case Status.active:
        return todoList.filter(todo => !todo.completed
          && todo.title.toLowerCase()
            .includes(queryFilter));

      case Status.completed:
        return todoList.filter(todo => todo.completed
          && todo.title.toLowerCase()
            .includes(queryFilter));

      case Status.all:
      default:
        return todoList.filter(todo => todo.title.toLowerCase()
          .includes(queryFilter));
    }
  }, [filter, todoList]);

  const filteredTodos = useMemo(filterTodos, [filterTodos]);

  return (
    filteredTodos.length === 0
      ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )
      : (
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
            {filteredTodos.map(({
              id, completed, title, userId,
            }) => (
              <tr
                data-cy="todo"
                key={id}
                className={classNames(
                  {
                    'has-background-info-light':
                      openedTodo && openedTodo.id === id,
                  },
                )}
              >
                <>
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
                      className={classNames(
                        {
                          'has-text-success': completed,
                          'has-text-danger': !completed,
                        },
                      )}
                    >
                      {title}
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => setTodo(
                        {
                          id,
                          title,
                          completed,
                          userId,
                        },
                      )}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'far',
                          {
                            'fa-eye-slash': openedTodo
                              && openedTodo.id === id,
                            'fa-eye': !openedTodo || openedTodo.id !== id,
                          },
                        )}
                        />
                      </span>
                    </button>
                  </td>
                </>
              </tr>
            ))}
          </tbody>
        </table>
      )
  );
};
