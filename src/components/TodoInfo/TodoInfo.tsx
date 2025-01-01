import { FC } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentTodo } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  const selectedTodo = useSelector<RootState, Todo | null>(
    state => state.currentTodo,
  );
  const dispatch = useDispatch();

  const isSelected = id === selectedTodo?.id;

  const handleSelect = () => {
    dispatch(changeCurrentTodo(todo));
  };

  return (
    <tr
      data-cy="todo"
      className={cn({ 'has-background-info-light': isSelected })}
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
            <i
              className={cn('far', {
                'fa-eye': !isSelected,
                'fa-eye-slash': isSelected,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
