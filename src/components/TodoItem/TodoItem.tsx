import cn from 'classnames';

import { useAppDispatch } from '../../app/hooks';
import { getCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  getUserById: (userId: number) => Promise<User>;
  onOpenModal: () => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  getUserById,
  onOpenModal,
}) => {
  const { id, title, completed, userId } = todo;
  const dispatch = useAppDispatch();

  const handleGetCurrentTodo = async () => {
    onOpenModal();

    const currentTodo = {
      todo,
      user: await getUserById(userId),
    };

    dispatch(getCurrentTodo(currentTodo));
  };

  return (
    <tr key={id} data-cy="todo">
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
          onClick={handleGetCurrentTodo}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
