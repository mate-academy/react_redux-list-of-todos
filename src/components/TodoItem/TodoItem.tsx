import { FC } from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../utils/hooks';
import { useDispatch } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

const TodoItem: FC<Props> = ({ todo }) => {
  const { completed, id, title } = todo;
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  return (
    <tr
      data-cy="todo"
      className={classnames({
        'has-background-info-light': selectedTodo,
      })}
      key={id}
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
          className={classnames({
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
          onClick={() => dispatch(setCurrentTodo(todo))}
        >
          <span className="icon">
            <i
              className={classnames('far', {
                'fa-eye-slash': selectedTodo?.id === id,
                'fa-eye': selectedTodo?.id !== id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
