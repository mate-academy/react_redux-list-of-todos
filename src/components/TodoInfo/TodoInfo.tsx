import classNames from 'classnames';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  id: number,
  title: string,
  completed: boolean,
};

export const TodoInfo: FC<Props> = ({
  todo,
  id,
  title,
  completed,
}) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const setCurrentTodo = () => {
    dispatch(actionsCurrentTodo.setTodo(todo));
  };

  return (
    <>
      <td className="is-vcentered">
        {id}
      </td>

      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={classNames(
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
          onClick={setCurrentTodo}
        >
          <span className="icon">
            <i className={classNames(
              'far',
              {
                'fa-eye': currentTodo?.id !== id,
                'fa-eye-slash': currentTodo?.id === id,
              },
            )}
            />
          </span>
        </button>
      </td>
    </>
  );
};
