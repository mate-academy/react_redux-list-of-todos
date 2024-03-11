import React, { useEffect, useState } from 'react';

import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterTodos } from '../helpers/helper';

export const TodoList: React.FC = () => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const selectedTodo = useAppSelector(state => state.currentTodo);

  const onSelectTodo = (todo: Todo) => {
    dispatch({ type: 'currentTodo/SET', payload: todo });
  };

  useEffect(() => {
    setFilteredTodos(filterTodos(todos, query, status));
  }, [query, status, todos]);

  if (!filteredTodos.length) {
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
          <th aria-label="header-table">
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th aria-label="header-division"> </th>
        </tr>
      </thead>

      <tbody>
        {filteredTodos.map(todo => (
          <tr data-cy="todo" className="">
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
            <td className="has-text-right is-vcentered" aria-label="todo-row">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                aria-label="todo-row"
                onClick={() => onSelectTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={
                      !selectedTodo || selectedTodo.id !== todo.id
                        ? 'far fa-eye'
                        : 'far fa-eye-slash'
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
