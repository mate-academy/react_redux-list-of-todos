/* eslint-disable */
import cn from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { Todo } from '../../types/Todo';
import { FilterStatus } from '../../types/FilterStatus';
import { setSelectedTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  function getFilteredTodos(
    todos: Todo[],
    query: string,
    status: FilterStatus,
  ) {
    return todos.filter(todo => {
      const normalizedQuery = query.trim().toLowerCase();
      const includesQuery = todo.title.toLowerCase().includes(normalizedQuery);

      switch (status) {
        case 'active':
          return includesQuery && !todo.completed;

        case 'completed':
          return includesQuery && todo.completed;

        case 'all':
        default:
          return includesQuery;
      }
    });
  }

  const filteredTodos = getFilteredTodos(todos, query, status as FilterStatus);

  return (
    <>
      {!Boolean(filteredTodos.length) && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {filteredTodos.map(todo => (
            <tr data-cy="todo">
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
                  onClick={() => dispatch(setSelectedTodo(todo))}
                >
                  <span className="icon">
                    <i
                      className={`far ${selectedTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
