/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(
    state => state.currentTodo,
  ) as Todo | null;
  const isSelected = (todo: Todo) => selectedTodo?.id === todo.id;

  const visibleTodos = useAppSelector(({ filter, todos }) => {
    if (filter.status === 'all' && !filter.query) {
      return todos;
    }

    const lowerQuery = filter.query.toLocaleLowerCase();

    return todos.filter(todo => {
      if (filter.status === 'active' && todo.completed) {
        return false;
      }

      if (filter.status === 'completed' && !todo.completed) {
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
        {visibleTodos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={isSelected(todo) ? 'has-background-info-light' : ''}
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
                onClick={() => dispatch(setTodo(todo))}
              >
                <span className="icon">
                  <i
                    className={
                      isSelected(todo) ? 'far fa-eye-slash' : 'far fa-eye'
                    }
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
