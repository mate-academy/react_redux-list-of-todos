import React, { useMemo } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector<RootState, Todo[]>(state => state.todos);
  const currentTodo = useSelector<RootState, Todo | null>(
    state => state.currentTodo,
  );
  const { query, status } = useSelector((state: RootState) => state.filter);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      if (!matchesQuery) {
        return false;
      }

      if (status === 'all') {
        return true;
      }

      return status === 'completed' ? todo.completed : !todo.completed;
    });
  }, [query, status, todos]);

  return (
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
              'has-background-info-light': todo.id === currentTodo?.id,
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
                className={cn({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
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
                onClick={() => dispatch(setCurrentTodo(todo))}
              >
                <span className="icon">
                  <i
                    className={cn(
                      'far',
                      todo.id === currentTodo?.id ? 'fa-eye-slash' : 'fa-eye',
                    )}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
