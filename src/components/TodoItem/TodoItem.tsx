import cn from 'classnames';

import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { getCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  getUserById: (userId: number) => Promise<User>;
  onOpenModal: () => void;
  showModal: boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  getUserById,
  showModal,
  onOpenModal,
}) => {
  const { id, title, completed, userId } = todo;
  const dispatch = useAppDispatch();

  const [activeTodo, setActiveTodo] = useState<Todo>();

  const handleOnActiveTodo = () => {
    setActiveTodo(todo);
  };

  const handleGetCurrentTodo = async () => {
    onOpenModal();

    handleOnActiveTodo();

    const currentTodo = {
      todo,
      user: await getUserById(userId),
    };

    dispatch(getCurrentTodo(currentTodo));
  };

  return (
    <tr
      key={id}
      data-cy="todo"
      className={cn({
        'has-background-info-light': activeTodo?.id === id && showModal,
      })}
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
          onClick={handleGetCurrentTodo}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': !showModal,
                'fa-eye-slash': showModal,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
