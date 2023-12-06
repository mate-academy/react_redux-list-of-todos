import React, { useMemo } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsCurrentTodos } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { FilterStatusEnum } from '../../types/FilterStatusEnum';

export const TodoList: React.FC = () => {
  const todosState = useAppSelector((state) => state.todos);
  const filterState = useAppSelector((state) => state.filter);
  const { query, status } = filterState;

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector((state) => state.currentTodo);

  const filteredTodos = useMemo(() => {
    const { data: todos } = todosState;

    return todos.filter((todo: Todo) => {
      const { completed } = todo;

      switch (status) {
        case FilterStatusEnum.ALL:
          return true;
        case FilterStatusEnum.COMPLETED:
          return completed;
        case FilterStatusEnum.ACTIVE:
          return !completed;
        default:
          return true;
      }
    }).filter((todo: Todo) => (query
      ? todo.title.toLowerCase().includes(query.toLowerCase())
      : true));
  }, [query, status, todosState]);

  return (
    <>
      {!filteredTodos.length ? (
        <p className="notification is-warning">
          There are no todos matching the current filter criteria
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
            {filteredTodos.map((todo: Todo) => {
              const { id, completed, title } = todo;

              return (
                <tr key={id} data-cy="todo">
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
                      className={cn({
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
                      onClick={() => dispatch(
                        actionsCurrentTodos.setTodo(todo),
                      )}
                    >
                      <span className="icon">
                        <i
                          className={cn('far', {
                            'fa-eye-slash': currentTodo?.id === id,
                            'fa-eye': currentTodo?.id !== id,
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
