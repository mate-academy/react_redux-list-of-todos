import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { setUserIdAction } from '../../store/actions';
import { selectedUserIdSelector } from '../../store/selectors';

type Props = Omit<Todo, 'id'>;

export const TodoItem: React.FC<Props> = React.memo(({
  title, completed, userId,
}) => {
  const selectedUserId = useSelector(selectedUserIdSelector);
  const dispatch = useDispatch();

  return (
    <li className={cn('TodoList__item', {
      'TodoList__item--unchecked': !completed,
      'TodoList__item--checked': completed,
    })}
    >
      <label>
        <input
          type="checkbox"
          checked={completed}
          readOnly
        />
        <p>{title}</p>
      </label>

      <button
        type="button"
        className={cn('TodoList__user-button', 'button', {
          'TodoList__user-button--selected': selectedUserId === userId,
        })}
        onClick={() => {
          dispatch(setUserIdAction(userId));
        }}
      >
        {`User #${userId}`}
      </button>
    </li>
  );
});
