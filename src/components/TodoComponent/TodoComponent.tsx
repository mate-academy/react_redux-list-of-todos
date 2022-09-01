import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { selectors } from '../../store';
import { actions as todosActions } from '../../store/todos';

type Props = {
  todo: Todo;
};

export const TodoComponent: FC<Props> = memo(({ todo }) => {
  const {
    id, title, completed, userId,
  } = todo;

  const dispatch = useDispatch();
  const { selectedTodo } = useSelector(selectors.getTodosInfo);

  return (
    <tr
      key={id}
      data-cy="todo"
      className={classNames({
        'has-background-info-light': selectedTodo?.id === id,
      })}
    >
      <td className="is-vcentered">{userId}</td>
      <td className="is-vcentered">
        {completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p className={completed ? 'has-text-success' : 'has-text-danger'}>
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch(todosActions.selectTodo(todo))}
        >
          <span className="icon">
            <i
              className={
                selectedTodo?.id !== id
                  ? 'far fa-eye'
                  : 'far fa-eye-slash'
              }
            />
          </span>
        </button>
      </td>
    </tr>
  );
});
