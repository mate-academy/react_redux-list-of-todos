import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';
import { RootState, AppDispatch } from '../../app/store';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos);
  const { query, status } = useSelector((state: RootState) => state.filter);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  const filtered = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });

  if (!filtered.length) {
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
        {filtered.map(todo => (
          <tr
            data-cy="todo"
            key={todo.id}
            className={
              currentTodo?.id === todo.id ? 'has-background-info-light' : ''
            }
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
                onClick={() =>
                  dispatch(
                    setCurrentTodo(currentTodo?.id === todo.id ? null : todo),
                  )
                }
              >
                <span className="icon">
                  <i
                    className={`far ${currentTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
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
