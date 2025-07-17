import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { setCurrentTodo } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { id, title, completed } = todo;
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const openedTodo = selectedTodo?.id === id;
  const dispatch = useAppDispatch();

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check"></i>
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={classNames(
            { 'has-text-danger': !completed },
            { 'has-text-success': completed },
          )}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch(setCurrentTodo(todo))}
        >
          <span className="icon">
            {openedTodo ? (
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
