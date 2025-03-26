import { FC } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';
import { useAppSelector } from '../../hooks/useAppSelector';

interface Props {
  todo: Todo;
}

export const TodoItem: FC<Props> = ({ todo }) => {
  const { id, completed, title } = todo;

  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { setCurrentTodo } = currentTodoSlice.actions;

  const handleSelectTodo = () => {
    dispatch(setCurrentTodo(todo));
  };

  return (
    <tr data-cy="todo" className="" key={id}>
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
          className={cn({
            'has-text-danger': !completed,
            'has-text-success': completed,
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
          onClick={handleSelectTodo}
        >
          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye':
                  !currentTodo || (currentTodo && currentTodo.id !== id),
                'fa-eye-slash': currentTodo && currentTodo.id === id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
