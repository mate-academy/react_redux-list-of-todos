/* eslint-disable */
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setSelectedTodo } from '../../features/currentTodoSlice';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo.selectedTodo);

  const normalizedQuery = query.trim().toLowerCase();

  const visibleTodos = items.filter(todo => {
    const title = todo.title.toLowerCase();
    const matchesQuery = title.includes(normalizedQuery);

    if (status === 'active') {
      return !todo.completed && matchesQuery;
    }

    if (status === 'completed') {
      return todo.completed && matchesQuery;
    }

    return matchesQuery;
  });

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
              key={todo.id}
              data-cy="todo"
              className={selectedTodo?.id === todo.id ? 'has-background-info-light' : ''}
            >
              <td>{todo.id}</td>

              <td>
                {todo.completed ? (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                ) : (
                <span className="icon" data-cy="iconNotCompleted">
                  <i className="far fa-circle" />
                </span>
                )}
              </td>

              <td className="is-expanded">
                <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
                  {todo.title.charAt(0).toUpperCase() + todo.title.slice(1)}
                </p>
              </td>

              <td className="has-text-right">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() =>
                    dispatch(
                      setSelectedTodo(
                        selectedTodo?.id === todo.id ? null : todo
                      )
                    )
                  }
                >
                  <span className="icon">
                    <i
                      className={
                        selectedTodo?.id === todo.id
                          ? 'far fa-eye-slash'
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
