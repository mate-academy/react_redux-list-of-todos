import React from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features';
import { Status } from '../../types';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const visibleTodos = useAppSelector(({ todos, filter }) => {
    if (filter.status === Status.all && filter.query === '') {
      return todos;
    }

    const lowerQuery = filter.query.toLocaleLowerCase();

    return todos.filter(todo => {
      if (todo.completed && filter.status === Status.active) {
        return false;
      }

      if (!todo.completed && filter.status === Status.completed) {
        return false;
      }

      return todo.title.toLocaleLowerCase().includes(lowerQuery);
    });
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
          const { id, completed, title } = todo;

          return (
            <tr data-cy="todo" key={id}>
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={`${completed ? 'has-text-success' : 'has-text-danger'}`}
                >
                  {title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() =>
                    dispatch(currentTodoSlice.actions.setTodo(todo))
                  }
                >
                  <span className="icon">
                    <i
                      className={`far ${id === currentTodo?.id ? 'fa-eye-slash' : 'fa-eye'}`}
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
