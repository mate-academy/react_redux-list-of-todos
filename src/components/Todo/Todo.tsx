import { TodoType } from '../../types/Todo';

import { setCurrentTodo } from '../../features/currentTodo';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

interface TodoProps {
  todo: TodoType;
}

export const Todo = ({ todo }: TodoProps) => {
  const { currentTodo } = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{todo?.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={`${todo?.completed ? 'has-text-success' : 'has-text-danger'}`}
        >
          {todo?.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch(setCurrentTodo(todo))}
        >
          <span className="icon">
            <i
              className={`far fa-eye, ${currentTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
