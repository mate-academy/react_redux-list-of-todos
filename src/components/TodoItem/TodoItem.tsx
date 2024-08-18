import cn from 'classnames';

import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { ErrorMessage } from '../../types/ErrorMessage';

type Props = {
  todo: Todo;
  onOpenModal: () => void;
  showModal: boolean;
};

export const TodoItem: React.FC<Props> = ({ todo, showModal, onOpenModal }) => {
  const { id, title, completed, userId } = todo;
  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo.todo);
  const isOpenCurrentTodo = currentTodo?.id === id && showModal;

  const fetchUserId = () => {
    dispatch(currentTodoActions.setLoading(true));

    getUser(userId)
      .then(userFromServer => {
        dispatch(currentTodoActions.loadCurrentUser(userFromServer));
      })
      .finally(() => {
        dispatch(currentTodoActions.setLoading(false));
      })
      .catch(() => {
        dispatch(currentTodoActions.setError(ErrorMessage.ERROR));
      });
  };

  const handleGetCurrentTodo = () => {
    onOpenModal();

    dispatch(currentTodoActions.loadCurrentTodo(todo));

    fetchUserId();
  };

  const getTextClass = (isCompleted: boolean) => {
    return cn({
      'has-text-danger': !isCompleted,
      'has-text-success': isCompleted,
    });
  };

  const getIconClass = (openCurrentTodo: boolean) => {
    return cn('far', {
      'fa-eye': !openCurrentTodo,
      'fa-eye-slash': openCurrentTodo,
    });
  };

  return (
    <tr
      key={id}
      data-cy="todo"
      className={cn({ 'has-background-info-light': isOpenCurrentTodo })}
    >
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check"></i>
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={getTextClass(completed)}>{title}</p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={handleGetCurrentTodo}
          data-cy="selectButton"
          className="button"
          type="button"
        >
          <span className="icon">
            <i className={getIconClass(isOpenCurrentTodo)} />
          </span>
        </button>
      </td>
    </tr>
  );
};
