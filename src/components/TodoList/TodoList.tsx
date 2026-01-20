/* eslint-disable */
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/index';
import { openWith } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(s => s.todos.items);
  const { status, query } = useAppSelector(s => s.filter);
  const currentTodo = useAppSelector(s => s.currentTodo.todo);

  const visible = useMemo(() => {
    let list = todos;

    if (status !== 'all') {
      list = list.filter(t =>
        status === 'completed' ? t.completed : !t.completed,
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(t => t.title.toLowerCase().includes(q));
    }

    return list;
  }, [todos, status, query]);

  if (!visible.length) {
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
        {visible.map((t: Todo) => {
          const isCompleted = t.completed;
          const isActive = currentTodo?.id === t.id;

          return (
            <tr
              key={t.id}
              data-cy="todo"
              className={isActive ? 'has-background-info-light' : undefined}
            >
              <td className="is-vcentered">{t.id}</td>

              <td className="is-vcentered">
                {isCompleted && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={
                    isCompleted ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {t.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => dispatch(openWith(t))}
                >
                  <span className="icon">
                    <i
                      className={`far ${isActive ? 'fa-eye-slash' : 'fa-eye'}`}
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
