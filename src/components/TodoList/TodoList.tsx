/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { setTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const { todos } = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const getFilteredTodos = (todos: Todo[], filter: string, query: string) => {
    let copyTodos = [...todos];

    // Фільтрація по тексту
    if (query.trim()) {
      const normalizedQuery = query.trim().toLowerCase();

      copyTodos = copyTodos.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    // Фільтрація по статусу
    if (filter) {
      copyTodos = copyTodos.filter(todo => {
        switch (filter) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      });
    }

    return copyTodos;
  };

  useEffect(() => {
    setFilteredTodos(getFilteredTodos(todos, status, query));
  }, [status, todos, query]);

  return (
    <>
      {filteredTodos.length > 0 ? (
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
              <th />
            </tr>
          </thead>

          <tbody>
            {filteredTodos.map((todo, index) => (
              <tr
                data-cy="todo"
                className={index % 2 === 1 ? 'has-background-info-light' : ''}
                key={todo.id}
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
                    className={classNames({
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
                    })}
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
                    {currentTodo && currentTodo.id === todo.id ? (
                      <span className="icon">
                        <i className="far fa-eye-slash" />
                      </span>
                    ) : (
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
