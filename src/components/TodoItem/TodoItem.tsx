import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  return (
    <tr data-cy="todo" key={id}>
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered"> </td>

      <td className="is-vcentered is-expanded">
        <p className={classNames(
          {
            'has-text-success': completed,
            'has-text-danger': !completed,
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
        >
          <span className="icon">
            <i className={classNames('far', 'fa-eye')} />
          </span>
        </button>
      </td>
    </tr>
  );
};
