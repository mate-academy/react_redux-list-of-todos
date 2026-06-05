/* eslint-disable */
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filters);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    if (status === 'active') {
      return matchesQuery && !todo.completed;
    }

    if (status === 'completed') {
      return matchesQuery && todo.completed;
    }

    return matchesQuery;
  });

  return (
    <>
      {visibleTodos.length === 0 && (
        <div className="notification is-warning">
          No todos found. Please add some!
        </div>
      )}

      {visibleTodos.length > 0 && (
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
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
                    }
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
                        key={
                          currentTodo?.id === todo.id ? 'active' : 'inactive'
                        }
                        className={
                          currentTodo?.id === todo.id
                            ? 'fas fa-eye-slash'
                            : 'far fa-eye'
                        }
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
