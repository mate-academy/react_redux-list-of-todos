import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { selectTodo } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';

type Props = {
  todo: Todo;
};
export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { value: selectedTodo } = useAppSelector(state => state.currentTodo);

  const handleSelectTodo = (currentTodo: Todo) => {
    dispatch(selectTodo(currentTodo));
  };

  return (
    <tr data-cy="todo" key={todo.id}>
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={cn({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
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
          onClick={() => handleSelectTodo(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': selectedTodo?.id !== todo.id,
                'fa-eye-slash': selectedTodo?.id === todo.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
