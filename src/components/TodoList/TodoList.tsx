/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.toLowerCase().trim());

    switch (status) {
      case 'active':
        return !todo.completed && matchesQuery;
      case 'completed':
        return todo.completed && matchesQuery;
      default:
        return matchesQuery;
    }
  });

  const handleSelectTodo = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };

  if (filteredTodos.length === 0) {
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
        {filteredTodos.map(todo => {
          const isSelected = currentTodo?.id === todo.id;

          return (
            <tr
              data-cy="todo"
              key={todo.id}
              className={isSelected ? 'has-background-info-light' : ''}
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
                  onClick={() => handleSelectTodo(todo)}
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
  );
};
