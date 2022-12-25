import classNames from 'classnames';
import {
  FC, memo, useCallback, useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import { addTodo } from '../../../features/currentTodo';
import { Todo } from '../../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoItem: FC<Props> = memo(({ todo }) => {
  const { id, title, completed } = todo;
  const dispatch = useDispatch();
  const { currentTodo } = useAppSelector(state => state.currentTodo);
  const isSelected = useMemo(() => currentTodo?.id === id, [currentTodo]);

  const selectTodo = useCallback(() => {
    dispatch(addTodo(todo));
  }, []);

  return (
    <tr
      data-cy="todo"
      className={classNames(
        { 'has-background-info-light': isSelected },
      )}
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
        <p className={classNames(
          {
            'has-text-danger': !completed,
            'has-text-success': completed,
          },
        )}
        >
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={selectTodo}
        >
          <span className="icon">
            {isSelected
              ? <i className="far fa-eye-slash" />
              : <i className="far fa-eye" />}
          </span>
        </button>
      </td>
    </tr>
  );
});
