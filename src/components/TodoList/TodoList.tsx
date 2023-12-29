import React, { useMemo } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, currentTodo, filter } = useAppSelector(state => state);

  const filteredTodos = useMemo(() => {
    switch (filter.status) {
      case Status.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case Status.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [filter.status, todos]);

  const todosToRender = useMemo(() => {
    if (filter.query) {
      return filteredTodos.filter(todo => todo.title.toLowerCase()
        .includes(filter.query.trim().toLowerCase()));
    }

    return filteredTodos;
  }, [filter.query, filteredTodos]);

  return (
    <>
      {todosToRender.length > 0 ? (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>

              <th aria-label="head-check">
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>
              <th aria-label="eye-icon"> </th>
            </tr>
          </thead>

          <tbody>
            {todosToRender.map((todo) => {
              const {
                id,
                title,
                completed,
              } = todo;

              return (
                <tr
                  key={id}
                  data-cy="todo"
                  className={cn({
                    'has-background-info-light': currentTodo?.id === id,
                  })}
                >
                  <td className="is-vcentered">{id}</td>
                  {completed ? (
                    <td className="is-vcentered" aria-label="check">
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    </td>
                  ) : (
                    <td className="is-vcentered" aria-label="check"> </td>

                  )}

                  <td className="is-vcentered is-expanded">
                    <p className={cn(completed
                      ? 'has-text-success'
                      : 'has-text-danger')}
                    >
                      {title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered" aria-label="eye">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      aria-label="show_more"
                      onClick={() => dispatch(currentTodoActions.setTodo(todo))}
                    >
                      <span className="icon">
                        <i className={cn('far',
                          currentTodo?.id === id ? 'fa-eye-slash' : 'fa-eye')}
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
