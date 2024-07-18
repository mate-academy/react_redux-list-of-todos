import cn from 'classnames';

import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

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

  const fetchUserById = () => {
    dispatch(currentTodoActions.setLoading(true));

    getUser(userId)
      .then(userFromServer => {
        dispatch(currentTodoActions.loadCurrentUser(userFromServer));
      })
      .finally(() => {
        dispatch(currentTodoActions.setLoading(false));
      })
      .catch(() => {
        dispatch(currentTodoActions.setError('Something went error'));
      });
  };

  const handleGetCurrentTodo = () => {
    onOpenModal();

    dispatch(currentTodoActions.loadCurrentTodo(todo));

    fetchUserById();
  };

  return (
    <tr
      key={id}
      data-cy="todo"
      className={cn({
        'has-background-info-light': isOpenCurrentTodo,
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
                'fa-eye': !isOpenCurrentTodo,
                'fa-eye-slash': isOpenCurrentTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
