import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  function selectTodo() {
    dispatch(currentTodoSlice.actions.chooseTodo(todo));
  }

  return (
    <tr data-cy="todo" className="">
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
          onClick={selectTodo}
        >
          <span className="icon">
            {selectedTodo?.id === todo.id ? (
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
