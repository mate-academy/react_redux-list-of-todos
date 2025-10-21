import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';
import cn from 'classnames';

type Props = {
  todo: Todo;
};
export const TodoRow: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const setTodo = (todoToSet: Todo) => {
    dispatch(actions.set(todoToSet));
  };

  const isTodoCurrent = (todoToCheck: Todo) => {
    return todoToCheck.id === currentTodo?.id;
  };

  const handleTodoSelect = (todoToSelect: Todo) => {
    if (isTodoCurrent(todoToSelect)) {
      dispatch(actions.remove());
    } else {
      setTodo(todoToSelect);
    }
  };

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light': currentTodo?.id === todo.id,
      })}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check"></i>
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => {
            handleTodoSelect(todo);
          }}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': !isTodoCurrent(todo),
                'fa-eye-slash': isTodoCurrent(todo),
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
