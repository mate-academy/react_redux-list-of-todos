import React, { FC } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  setIsLoading: (value: boolean) => void;
}

export const TodoComponent: FC<Props> = React.memo(({
  todo,
  setIsLoading,
}) => {
  const todoAmount = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const handleDetailsOpen = (currentTodo: Todo) => {
    setIsLoading(true);
    getUser(currentTodo.userId).then(user => dispatch(actions.setTodo({
      ...currentTodo,
      user,
    })));
  };

  const {
    id,
    title,
    completed,
  } = todo;

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
          onClick={() => handleDetailsOpen(todo)}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': todoAmount?.id !== todo.id,
                'fa-eye-slash': todoAmount?.id === todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
});
