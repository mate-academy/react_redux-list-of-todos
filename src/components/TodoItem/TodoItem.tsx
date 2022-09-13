import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { actions, selectors } from '../../store';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const selectedTodo = useSelector(selectors.selectedTodo);

  const handleSelectTodo = () => dispatch(actions.selectTodo(todo));

  const { id, completed, title } = todo;

  return (
    <tr data-cy="todo" className="">
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
          className={classNames(
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
          onClick={handleSelectTodo}
        >
          <span className="icon">
            {id === selectedTodo?.id ? (
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
