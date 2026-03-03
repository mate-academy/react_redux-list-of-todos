import React, { memo } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { selectFilteredTodos } from '../../features/todos';
import { selectCurrentTodo, selectTodo } from '../../features/currentTodo';

export const TodoList: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectFilteredTodos);
  const selectedTodo = useAppSelector(selectCurrentTodo);
  const selectedId = selectedTodo?.id ?? null;

  const handleTodoSelect = (todo: Todo) => {
    dispatch(selectTodo(todo));
  };

  if (!todos.length) {
    return null;
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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': todo.id === selectedId,
            })}
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
                onClick={() => handleTodoSelect(todo)}
              >
                <span className="icon">
                  {todo.id === selectedId ? (
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
});

TodoList.displayName = 'TodoList';
