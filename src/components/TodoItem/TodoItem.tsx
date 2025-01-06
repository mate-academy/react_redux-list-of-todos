import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
interface Props {
  todo: Todo;
  selectTodo: (todo: Todo) => void;
}

export const TodoItem: React.FC<Props> = props => {
  const { todo, selectTodo } = props;
  const currentTodo = useAppSelector(state => state.currentTodo);

  const isCurrentTodo = currentTodo === todo;

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
          onClick={() => selectTodo(todo)}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye-slash': isCurrentTodo,
                'fa-eye': !isCurrentTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
