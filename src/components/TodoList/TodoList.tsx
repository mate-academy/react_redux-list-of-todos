/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTodos } from '../../features/todos';
import { selectFilterStatus, selectorFilterQuery } from '../../features/filter';
import { Todo } from '../../types/Todo';
import { selectCurrentTodo, setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const query = useAppSelector(selectorFilterQuery);
  const status = useAppSelector(selectFilterStatus);
  const currentTodo = useAppSelector(selectCurrentTodo);

  const getFilteredTodos = (
    allTodos: Todo[],
    currentQuery: string,
    currentStatus: string,
  ) => {
    let filtered = allTodos;

    if (currentStatus !== 'all') {
      filtered = filtered.filter(todo =>
        currentStatus === 'completed' ? todo.completed : !todo.completed,
      );
    }

    if (currentQuery) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(currentQuery.toLowerCase()),
      );
    }

    return filtered;
  };

  const visibleTodos = getFilteredTodos(todos, query, status);

  const handleSelectTodo = (todo: Todo) => {
    if (currentTodo && currentTodo.id === todo.id) {
      dispatch(setCurrentTodo(null));
    } else {
      dispatch(setCurrentTodo(todo));
    }
  };

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
            className={todo.completed ? 'has-background-success-light' : ''}
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
              <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
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
                  {currentTodo && currentTodo.id === todo.id ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
