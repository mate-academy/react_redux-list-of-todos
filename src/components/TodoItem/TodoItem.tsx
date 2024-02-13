import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

interface Props {
  todo: Todo,
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { completed, title } = todo;
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const handleTodoSelected = (selectedTodo: Todo) => {
    dispatch(currentTodoActions.setTodo(selectedTodo));
  };

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">
        {todo.id}
      </td>

      <td className="is-vcentered">
        {completed
          && (
            <span className="icon" data-cy="iconCompleted">
              <i className="fas fa-check" />
            </span>
          )}
      </td>

      <td className="is-vcentered">
        <p className={cn({
          'has-text-danger': !completed,
          'has-text-success': completed,
        })}
        >
          {title}
        </p>
      </td>

      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <td className="has-text-right is-vcentered">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          onClick={() => handleTodoSelected(todo)}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i className={cn('far', {
              'fa-eye-slash': currentTodo && currentTodo.id === todo.id,
              'fa-eye': !currentTodo || currentTodo.id !== todo.id,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
