import { FC, useMemo } from 'react';
import cn from 'classnames';
import { useTodos } from '../../app/hooks';
import { getFilteredTodos } from '../../utils/getFilteredTodo';

export const TodoList: FC = () => {
  const { todos, currentTodo, handleSetCurrentTodo, status, query } =
    useTodos();

  const visibleTodos = useMemo(
    () => getFilteredTodos(todos, { status, query }),
    [todos, query, status],
  );

  return (
    <>
      {!visibleTodos.length && (
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
              const { id, completed, title } = todo;
              const isSelected = currentTodo?.id === id;

              return (
                <tr
                  key={id}
                  data-cy="todo"
                  className={cn({
                    'has-background-info-light': isSelected,
                  })}
                >
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
                      onClick={() => handleSetCurrentTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={cn('far', {
                            'fa-eye': !isSelected,
                            'fa-eye-slash': isSelected,
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
