import classNames from 'classnames';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const setCurrentTodo = () => {
    dispatch(actionsCurrentTodo.setTodo(todo));
  };

  return (
    <>
      <td className="is-vcentered">
        {todo.id}
      </td>

      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={classNames(
          {
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          },
        )}
        >
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={setCurrentTodo}
        >
          <span className="icon">
            <i className={classNames(
              'far',
              {
                'fa-eye': currentTodo?.id !== todo.id,
                'fa-eye-slash': currentTodo?.id === todo.id,
              },
            )}
            />
          </span>
        </button>
      </td>
    </>
  );
};
