/* eslint-disable */
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setSelectedTodoId } from '../../features/filter';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos.todos);
  const { query, status, selectedTodoId } = useAppSelector(
    state => state.filter,
  );
  const dispatch = useAppDispatch();

  // Фільтруємо тудушки перед мапуванням
  const visibleTodos = todos.filter(todo => {
    // 1. Фільтр за статусом (all, active, completed)
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    // 2. Фільтр за текстом пошуку (query)
    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.toLowerCase().trim());

    return matchesStatus && matchesQuery;
  });

  return (
    <>
      {visibleTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
      <table className="table is-narrow is-fullwidth">
        {visibleTodos.length !== 0 && (
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
        )}

        <tbody>
          {visibleTodos.map(todo => {
            // Перевіряємо чи саме цей елемент зараз обраний у модалці
            const isSelected = selectedTodoId === todo.id;

            return (
              <tr
                key={todo.id}
                data-cy="todo"
                className={isSelected ? 'has-background-info-light' : ''}
              >
                <td className="is-vcentered">{todo.id}</td>

                {/* Динамічна галочка виконання */}
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
                    onClick={() => dispatch(setSelectedTodoId(todo.id))}
                  >
                    <span className="icon">
                      <i
                        className={`far ${isSelected ? 'fa-eye-slash' : 'fa-eye'}`}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
