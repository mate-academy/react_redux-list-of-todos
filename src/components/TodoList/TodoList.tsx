import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const { todos } = useSelector((state: RootState) => state.todos);
  const { query, status } = useSelector((state: RootState) => state.filter);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  const dispatch = useDispatch();

  const filteredTodos = todos.filter((todo: Todo) => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    return matchesQuery && matchesStatus;
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
        {filteredTodos.map(todo => (
          <tr
            data-cy="todo"
            key={todo.id}
            className={classNames({
              'has-background-info-light': currentTodo?.id === todo.id,
            })}
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
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
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
                onClick={() => handleSelectTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye-slash': currentTodo?.id === todo.id,
                      'fa-eye': currentTodo?.id !== todo.id,
                    })}
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
