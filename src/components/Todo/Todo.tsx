import React from 'react';
import { Todo as TodoType } from '../../types/Todo';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todo: TodoType;
};

export const Todo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const { currentTodo } = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const handleTodoSelect = () => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <tr
      data-cy="todo"
      className={classNames('', {
        'has-background-info-light': currentTodo?.id === todo.id,
      })}
    >
      <td className="is-vcentered">{id}</td>
      {completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered"> </td>
      )}

      <td className="is-vcentered is-expanded">
        <p
          className={classNames('', {
            'has-text-danger': !completed,
            'has-text-success': completed,
          })}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={handleTodoSelect}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': !currentTodo,
                'fa-eye-slash': currentTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
