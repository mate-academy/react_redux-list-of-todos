import classNames from 'classnames';
import { Todo as TodoType } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';
import { useDispatch } from 'react-redux';

type Props = {
  todo: TodoType;
};

export const Todo: React.FC<Props> = ({ todo }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();
  const { id, completed, title } = todo;

  const handleCurrentTodo = () => {
    dispatch(setCurrentTodo(todo));
  };

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': todo === currentTodo,
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
        <p className={completed ? 'has-text-success' : 'has-text-danger'}>
          {title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleCurrentTodo}
        >
          <span className="icon">
            {currentTodo === todo ? (
              <i className="far fa-eye-slash" />
            ) : (
              <i className="far fa-eye" />
            )}
          </span>
        </button>
      </td>
    </tr>
  );
};
