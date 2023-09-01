import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    title, completed, id,
  } = todo;

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed
        && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={
            completed
              ? 'has-text-success'
              : 'has-text-danger'
          }
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch(currentTodoActions.setTodo(todo))}
        >
          <span className="icon">
            {currentTodo
              ? <i className="far fa-eye-slash" />
              : <i className="far fa-eye" />}
          </span>
        </button>
      </td>
    </tr>
  );
};
