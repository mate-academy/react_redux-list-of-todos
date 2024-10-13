import { useDispatch, useSelector } from 'react-redux';
import { Todo } from '../../types/Todo';
import { RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
  const dispatch = useDispatch();
  const { id, completed, title } = todo;
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const isTodoChosen = currentTodo?.id === id;

  const handleClick = (newTodo: Todo) => {
    dispatch(setCurrentTodo(newTodo));
  };

  return (
    <tr
      className={isTodoChosen ? 'has-background-info-light' : ''}
      data-cy="todo"
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
          onClick={() => handleClick(todo)}
        >
          <span className="icon">
            <i className={isTodoChosen ? 'far fa-eye' : 'far fa-eye-slash'} />
          </span>
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
