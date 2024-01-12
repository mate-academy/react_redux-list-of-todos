/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';

interface Props {
  todo: Todo
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const { currentTodo } = useAppSelector(state => state);
  const {
    id,
    title,
    completed,
  } = todo;

  const [isHovered, setIsHovered] = useState(false);

  const handleSelectBtnClick = () => dispatch(actions.setTodo(todo));

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': currentTodo?.id === id
          || isHovered,
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          onClick={handleSelectBtnClick}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': !(currentTodo?.id === id),
                'fa-eye-slash': currentTodo?.id === id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
