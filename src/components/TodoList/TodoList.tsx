import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Filter } from '../../types/Filter';

export const TodoList: React.FC = () => {
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const todos = useAppSelector((state) => state.todos);
  const { query, filterType } = useAppSelector((state) => state.filter);

  const dispatch = useAppDispatch();

  const filteredItems = useMemo(() => {
    let filtered = todos.filter((todo) => {
      switch (filterType) {
        case Filter.COMPLETED:
          return todo.completed;
        case Filter.ACTIVE:
          return !todo.completed;
        default:
          return true;
      }
    });

    if (query) {
      filtered = filtered.filter(
        (todo) => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filtered;
  }, [todos, filterType, query]);

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
        {filteredItems.map((todo) => {
          const { id, title, completed } = todo;

          return (
            <tr data-cy="todo" className="" key={id}>
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
                    'has-text-success': completed,
                    'has-text-danger': !completed,
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
                  onClick={() => dispatch(currentTodoActions.setTodo(todo))}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye':
                        currentTodo === null || currentTodo.id !== id,
                        'fa-eye-slash':
                        currentTodo !== null && currentTodo.id === id,
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
  );
};
