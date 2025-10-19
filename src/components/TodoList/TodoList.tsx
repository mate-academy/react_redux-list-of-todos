/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.items);
  const { status, query } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all'
        ? true
        : status === 'active'
          ? !todo.completed
          : todo.completed;

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  if (filteredTodos.length === 0) {
    return (
      <p className="notification is-warning" data-cy="noTodosMessage">
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
          <th></th>
        </tr>
      </thead>

      <tbody>
        {filteredTodos.map((todo: Todo, index) => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={todo.id === currentTodo?.id ? 'has-background-info-light' : ''}
          >
            <td className="is-vcentered">{index + 1}</td>

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
                onClick={() =>
                  dispatch(setCurrentTodo(
                    currentTodo?.id === todo.id ? null : todo
                  ))
                }
              >
                <span className="icon">
                  <i className={`far fa-eye${currentTodo?.id === todo.id ? '-slash' : ''}`} />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
