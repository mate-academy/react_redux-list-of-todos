import React from 'react';
import classNames from 'classnames';
import { useAppDispatch } from '../../app/hooks';
import { currentTodoActions } from '../../features/currentTodo';

interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
  };
  currentTodo: { id: number } | null;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, currentTodo }) => {
  const dispatch = useAppDispatch();

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
          onClick={() => dispatch(currentTodoActions.add(todo))}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye-slash': currentTodo,
                'fa-eye': !currentTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
