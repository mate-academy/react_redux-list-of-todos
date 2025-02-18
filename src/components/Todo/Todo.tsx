import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Todo } from '../../types/Todo';
import { setCurrentTodo } from '../../features/currentTodo';
import { RootState } from '../../app/store';

type Props = {
  todo: Todo;
};

export const TodoListElement: React.FC<Props> = ({ todo }) => {
  const { id, completed, title } = todo;
  const selectedTodo = useSelector(
    (state: RootState) => state.currentTodo,
  ) as Todo | null;

  const dispatch = useDispatch();

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-success': completed,
            'has-text-danger': !completed,
          })}
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
            <i
              className={classNames('far', {
                'fa-eye': !selectedTodo || selectedTodo.id !== id,
                'fa-eye-slash': selectedTodo?.id === id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
