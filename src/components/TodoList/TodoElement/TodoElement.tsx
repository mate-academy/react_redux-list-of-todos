import { useDispatch } from 'react-redux';
import { Todo } from '../../../types/Todo';
import { currentTodoSlice } from '../../../features/currentTodo';
import { useAppSelector } from '../../../app/hooks';

interface TodoElementProps {
  todo: Todo;
}

export const TodoElement: React.FC<TodoElementProps> = ({ todo }) => {
  const completedTodo = todo.completed;
  const dispatch = useDispatch();
  const todoCurrent = useAppSelector(state => state.currentTodo);
  const openTodo = (el: Todo) => dispatch(currentTodoSlice.actions.addTodo(el));

  const isOpenTodo = todo.id === todoCurrent?.id;

  return (
    <tr data-cy="todo" className="has-background-info-light?">
      <td className="is-vcentered">{todo.id}</td>

      {todo.completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered"> </td>
      )}

      <td className="is-vcentered is-expanded">
        <p className={completedTodo ? 'has-text-success' : 'has-text-danger'}>
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button data-cy="selectButton" className="button" type="button">
          <span className="icon" onClick={() => openTodo(todo)}>
            <i className={`far ${isOpenTodo ? 'fa-eye-slash' : 'fa-eye'}`} />
          </span>
        </button>
      </td>
    </tr>
  );
};
