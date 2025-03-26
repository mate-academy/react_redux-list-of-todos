import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/todoReducer';

type Props = {
  todo: Todo;
};

const SelectButton: React.FC<{ isSelected: boolean; onClick: () => void }> = ({
  isSelected,
  onClick,
}) => {
  return (
    <button
      data-cy="selectButton"
      className="button"
      type="button"
      onClick={onClick}
    >
      <span className="icon">
        <i
          className={classNames('far', {
            'fa-eye': !isSelected,
            'fa-eye-slash': isSelected,
          })}
        />
      </span>
    </button>
  );
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const openModal = () => dispatch(currentTodoActions.setTodo(todo));

  const rowClassNames = useMemo(
    () =>
      classNames({
        'has-background-info-light': currentTodo?.id === id,
      }),
    [currentTodo, id],
  );

  const titleClassNames = useMemo(
    () =>
      classNames({
        'has-text-danger': !completed,
        'has-text-success': completed,
      }),
    [completed],
  );

  const isTodoSelected = useMemo(
    () => currentTodo?.id === id,
    [currentTodo, id],
  );

  return (
    <tr data-cy="todo" className={rowClassNames}>
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={titleClassNames}>{title}</p>
      </td>

      <td className="has-text-right is-vcentered">
        <SelectButton isSelected={isTodoSelected} onClick={openModal} />
      </td>
    </tr>
  );
};
