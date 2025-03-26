// src/components/TodoList/TodoList.tsx
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos as Todo[]);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo as Todo | null);

  // Фільтр за пошуком і статусом
  const visibleTodos = React.useMemo(() => {
    return todos.filter(todo => {
      // пошук (нечутливий до регістру)
      const matchesSearch = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      // статус
      let matchesStatus = true;

      if (status === 'active') {
        matchesStatus = !todo.completed;
      } else if (status === 'completed') {
        matchesStatus = todo.completed;
      }

      return matchesSearch && matchesStatus;
    });
  }, [todos, query, status]);

  // Якщо нічого не знайдено
  if (!visibleTodos.length) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  // Перевірка: чи обраний цей Todo
  const isSelected = (todo: Todo) => currentTodo?.id === todo.id;

  const handleSelect = (todo: Todo) => {
    if (isSelected(todo)) {
      dispatch(setCurrentTodo(null));
    } else {
      dispatch(setCurrentTodo(todo));
    }
  };

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          {/* Колонка з іконкою "check" */}
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th />
        </tr>
      </thead>

      <tbody>
        {visibleTodos.map(todo => {
          // Якщо todo.completed === true -> іконка check + зелений текст
          // якщо false -> немає іконки, текст червоний
          const iconCompleted = todo.completed && (
            <span data-cy="iconCompleted" className="icon">
              <i className="fas fa-check" />
            </span>
          );

          const textClass = todo.completed
            ? 'has-text-success'
            : 'has-text-danger';
          // (опціонально) підсвітка рядка, якщо вибраний
          const rowClass = isSelected(todo) ? 'has-background-info-light' : '';

          return (
            <tr key={todo.id} data-cy="todo" className={rowClass}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">{iconCompleted}</td>
              <td className="is-vcentered is-expanded">
                <p className={textClass}>{todo.title}</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleSelect(todo)}
                >
                  <span className="icon">
                    {/* Якщо вибраний -> eye-slash, інакше -> eye */}
                    <i
                      className={`far ${isSelected(todo) ? 'fa-eye-slash' : 'fa-eye'}`}
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
