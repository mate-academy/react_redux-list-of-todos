import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  // Pobieramy informację o aktualnie otwartym zadaniu
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const visibleTodos = todos.filter((todo: Todo) => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    return matchesQuery && matchesStatus;
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
        {visibleTodos.map((todo: Todo) => {
          // Sprawdzamy, czy to konkretne zadanie jest obecnie kliknięte/aktywne
          const isSelected = currentTodo?.id === todo.id;

          return (
            <tr
              data-cy="todo"
              key={todo.id}
              className={todo.completed ? 'has-background-info-light' : ''}
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
                  aria-label={isSelected ? 'Hide details' : 'View details'}
                  title={isSelected ? 'Hide details' : 'View details'}
                  // Jeśli zadanie jest już wybrane, kliknięcie powinno zamknąć modal (wysłać null)
                  onClick={() =>
                    dispatch(
                      isSelected ? setCurrentTodo(null) : setCurrentTodo(todo),
                    )
                  }
                >
                  <span className="icon">
                    {/* Tutaj decydujemy o ikonce na podstawie tego, czy zadanie jest otwarte w modalu */}
                    <i
                      className={isSelected ? 'far fa-eye-slash' : 'far fa-eye'}
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
