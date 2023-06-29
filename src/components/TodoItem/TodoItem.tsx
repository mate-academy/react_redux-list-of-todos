import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const isMatchingId = currentTodo?.id === todo.id;

  const setCurrentTodo = (todoToSet: Todo) => {
    dispatch(currentTodoActions.setTodo(todoToSet));
  };

  const handleButtonClick = (todoToSet: Todo) => {
    setCurrentTodo(todoToSet);
  };

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isMatchingId,
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
        <p className={classNames({
          'has-text-danger': !todo.completed,
          'has-text-success': todo.completed,
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
          onClick={() => handleButtonClick(todo)}
        >
          <span className="icon">
            <i className={classNames('far', {
              'fa-eye': !isMatchingId,
              'fa-eye-slash': isMatchingId,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
