import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  onShow: (t: Todo) => void;
  modalOpen: boolean;
}
export const TodoInfo: React.FC<Props> = ({ todo, onShow, modalOpen }) => (
  <tr
    data-cy="todo"
    className={classNames({ 'has-background-info-light': todo.completed })}
  >
    <td className="is-vcentered">{todo.id}</td>
    <td className="is-vcentered">
      {todo.completed && <i className="fas fa-check" />}
    </td>
    <td className="is-vcentered is-expanded">
      <p
        className={classNames({
          'has-text-success': todo.completed,
          'has-text-danger': !todo.completed,
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
        onClick={() => onShow(todo)}
      >
        <span className="icon">
          <i
            className={classNames({
              'far fa-eye': !modalOpen,
              'far fa-eye-slash': modalOpen,
            })}
          />
        </span>
      </button>
    </td>
  </tr>
);
