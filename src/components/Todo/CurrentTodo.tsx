import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/store';
import { useDispatch } from 'react-redux';
import {
  actions as currentTodoActions,
  currentTodoSelector,
} from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const CurrentTodo: React.FC<Props> = ({ todo }) => {
  const currentTodo = useAppSelector(currentTodoSelector);
  const dispatch = useDispatch();

  const handleSetOfTodo = () => dispatch(currentTodoActions.set(todo));

  return (
    <tr data-cy="todo" className="" key={todo.id}>
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check"></i>
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-success': todo.completed,
            'has-text-danger': !todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={handleSetOfTodo}
        >
          <span className="icon">
            <i
              className={classNames(
                'far',
                currentTodo === todo ? 'fa-eye-slash' : 'fa-eye',
              )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
