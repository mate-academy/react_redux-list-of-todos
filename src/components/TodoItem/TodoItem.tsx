import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, completed, title } = todo;
  const currentTodoId = useSelector<RootState>(state => state.currentTodo?.id);
  const dispatch = useDispatch();
  const isTodoSelected = currentTodoId === id;

  return (
    <tr
      data-cy="todo"
      className={classnames({ 'has-background-info-light': isTodoSelected })}
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
          className={classnames({
            'has-text-danger': !completed, 'has-text-success': completed,
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
          onClick={() => {
            dispatch(actions.setTodo(todo));
          }}
        >
          <span className="icon">
            <i className={classnames('far', {
              'fa-eye-slash': isTodoSelected,
              'fa-eye': !isTodoSelected,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
