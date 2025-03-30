import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { completed, id, title } = todo;
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const handleSelect = (todoItem: Todo) => () => {
    dispatch(currentTodoSlice.actions.select(todoItem));
  };

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
          onClick={handleSelect(todo)}
        >
          <span className="icon">
            {selectedTodo && selectedTodo.id === id && (
              <i className="far fa-eye-slash" />
            )}

            {selectedTodo &&
              typeof selectedTodo !== 'string' &&
              selectedTodo.id !== id && <i className="far fa-eye" />}

            {!selectedTodo && <i className="far fa-eye" />}
          </span>
        </button>
      </td>
    </tr>
  );
};
