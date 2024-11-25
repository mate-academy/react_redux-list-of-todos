import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const selectTodoHandler = (item: Todo) => {
    dispatch(currentTodoSlice.actions.add(item));
  };

  const { id, title, completed } = todo;

  return (
    <tr data-cy="todo" key={id}>
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
            'has-text-danger': !completed,
            'has-text-success': completed,
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
          onClick={() => selectTodoHandler(todo)}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye-slash': currentTodo?.id === id,
                'fa-eye': currentTodo?.id !== id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
