/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSelectedTodoId } from '../../features/filter';
import { getTodos } from '../../api';
import { setTodos } from '../../features/todos';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status, selectedTodoId } = useAppSelector(
    state => state.filter,
  );
  const todos = useAppSelector(state => state.todos);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(todos => dispatch(setTodos(todos)))
      .catch(() => console.error('Failed to load todos'))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });

  const handleSelectTodo = (todoId: number) => {
    dispatch(setSelectedTodoId(todoId));
  };

  const handleHideTodo = () => {
    dispatch(setSelectedTodoId(null));
  };

  if (isLoading) {
    return <div className="loader" data-cy="loader" />;
  }

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
        {filteredTodos.map(todo => (
          <tr key={todo.id} data-cy="todo">
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
              {selectedTodoId === todo.id ? (
                <button
                  data-cy="hideButton"
                  className="button is-danger"
                  type="button"
                  onClick={handleHideTodo}
                >
                  <span className="icon">
                    <i className="fas fa-eye-slash" />
                  </span>
                </button>
              ) : (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleSelectTodo(todo.id)}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
