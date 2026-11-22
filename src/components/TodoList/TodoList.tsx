import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import cn from 'classnames';
import { currentTodoSlice } from '../../features/currentTodo';

function getFilteredTodos(
  todos: Todo[],
  selectedStatus: Status,
  query: string,
) {
  let filteredTodos = [...todos];

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    filteredTodos = filteredTodos.filter(todo => {
      return todo.title.toLowerCase().includes(normalizedQuery);
    });
  }

  return filteredTodos.filter(todo => {
    switch (selectedStatus) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      case 'all':
      default:
        return true;
    }
  });
}

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, filter.status, filter.query);
  }, [todos, filter]);

  const dispatch = useAppDispatch();

  return (
    <>
      {visibleTodos.length === 0 ? (
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
              <tr
                data-cy="todo"
                className={cn({
                  'has-background-info-light': currentTodo?.id === todo.id,
                })}
                key={todo.id}
              >
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
                    className={cn(
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
                    onClick={() =>
                      dispatch(currentTodoSlice.actions.setCurrentTodo(todo))
                    }
                  >
                    <span className="icon">
                      <i
                        className={cn(
                          'far',
                          currentTodo?.id === todo.id
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
      )}
    </>
  );
};
