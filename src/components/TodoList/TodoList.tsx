/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  // Pobieramy dane z Redux
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  // Logika filtrowania
  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' ? todo.completed : !todo.completed);

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.toLowerCase().trim());

    return matchesStatus && matchesQuery;
  });

  return (
    <>
      {filteredTodos.length === 0 && (
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

        {/* JEDEN tbody na zewnątrz mapowania */}
        <tbody>
          {filteredTodos.map(todo => (
            <tr
              key={todo.id}
              data-cy="todo"
              className={
                selectedTodo?.id === todo.id ? 'has-background-info-light' : ''
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
                      setCurrentTodo(
                        selectedTodo?.id === todo.id ? null : todo,
                      ),
                    )
                  }
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
