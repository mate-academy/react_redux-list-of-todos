import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { actions } from '../../features/currentTodo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const curTodo = useSelector((state: RootState) => state.currentTodo.CurTodo);
  const isTodoActive = todo.completed;
  const isCurTodo = todo.id === curTodo?.id;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <tr
      data-cy="todo"
      className={classNames({ 'has-background-info-light': todo.completed })}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {isTodoActive && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames(
            { 'has-text-success': isTodoActive },
            { 'has-text-danger': !isTodoActive },
          )}
        >
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleClick}
        >
          <span className="icon">
            <i
              className={classNames(
                'far',
                { 'fa-eye-slash': isCurTodo },
                { 'fa-eye': !isCurTodo },
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
