import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
  } = todo;
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isSelectedTodo, setIsSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    if (isSelectedTodo) {
      dispatch(currentTodoActions.setTodo(isSelectedTodo));
    }
  }, [isSelectedTodo]);

  useEffect(() => {
    if (!currentTodo) {
      setIsSelectedTodo(null);
    }
  }, [currentTodo]);

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isSelectedTodo,
      })}
      key={todo.id}
    >
      <td className="is-vcentered">{id}</td>
      {completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered" />
      )}
      <td className="is-vcentered is-expanded">
        <p className={classNames({
          'has-text-success': completed,
          'has-text-danger': !completed,
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
          title="Select todo"
          onClick={() => setIsSelectedTodo(todo)}
        >
          <span className="icon">
            <i className={classNames({
              'far fa-eye-slash': isSelectedTodo,
              'far fa-eye': !isSelectedTodo,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
