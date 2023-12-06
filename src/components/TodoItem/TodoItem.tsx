import classNames from 'classnames';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

interface Props {
  todo: Todo,
}

export const TodoItem: FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const selected = useAppSelector(state => state.currentTodo);

  const onSelectButtonClick = (selectedTodo: Todo) => {
    dispatch(currentTodoActions.setTodo(selectedTodo));
  };

  return (
    <tr key={`${todo.title}-${todo.id}`} data-cy="todo">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
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
          onClick={() => onSelectButtonClick(todo)}
        >
          <span className="icon">
            <i className={classNames(
              'far',
              selected?.id === todo.id ? 'fa-eye-slash' : 'fa-eye',
            )}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
