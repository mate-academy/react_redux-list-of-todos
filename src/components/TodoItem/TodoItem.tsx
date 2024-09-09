import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const isCompleted = todo.completed;
  const isSelectedTodo = selectedTodo?.id === todo.id;

  const selectTodoToShow = (todoToShow: Todo) => {
    dispatch(actions.setCurrentTodo(todoToShow));
  };

  return (
    <tr
      data-cy="todo"
      className={classNames({
        'has-background-info-light': isSelectedTodo,
      })}
    >
      <td className="is-vcentered">{todo.id}</td>

      <td className="is-vcentered">
        {isCompleted && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-danger': !isCompleted,
            'has-text-success': isCompleted,
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
          onClick={() => selectTodoToShow(todo)}
        >
          <span className="icon">
            <i
              className={classNames('far', {
                'fa-eye': !isSelectedTodo,
                'fa-eye-slash': isSelectedTodo,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
