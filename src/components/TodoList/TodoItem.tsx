import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { currentTodoActions } from '../../features/currentTodo';
import useAppSelector from '../../hooks/useAppSelector';

type Props = {
  todo: Todo;
};

const TodoItemBase: React.FC<Props> = ({ todo }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();
  const { set: setCurrentTodo } = currentTodoActions;

  const { id, title, completed } = todo;

  const handleSelect = () => {
    dispatch(setCurrentTodo(todo));
  };

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': currentTodo?.id === id,
      })}
    >
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
          className={cn({
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
          onClick={handleSelect}
        >
          <span className="icon">
            {currentTodo?.id === id ? (
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

export const TodoItem = React.memo(TodoItemBase);
