import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';

interface TodoItemProps {
  todo: Todo;
  onSelectTodo: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onSelectTodo }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);

  return (
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
          onClick={() => onSelectTodo(todo)}
        >
          <span className="icon">
            {currentTodo?.id === todo.id ? (
              <i className="far fa-eye-slash" />
            ) : (
              <i className="far fa-eye" />
            )}
          </span>
        </button>
      </td>
    </tr>
  );
};
