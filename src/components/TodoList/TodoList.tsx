/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const selectedTodoId = useAppSelector(state => state.currentTodo?.id);

  const visibleTodos = todos.filter(todo => {
    const matchesStatus = status === 'all'
      || (status === 'active' && !todo.completed)
      || (status === 'completed' && todo.completed);

    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  if (visibleTodos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

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
        {visibleTodos.map(todo => {
          const isCurrent = todo.id === selectedTodoId;

          return (
            <tr
              key={todo.id}
              data-cy="todo"
              className={isCurrent ? 'has-background-info-light' : ''}
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
                <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    dispatch(setCurrentTodo(isCurrent ? null : todo));
                  }}
                >
                  <span className="icon">
                    <i className={`far ${isCurrent ? 'fa-eye-slash' : 'fa-eye'}`} />
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
