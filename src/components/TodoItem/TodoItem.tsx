import ClassNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodo } from '../../features/currentTodo';

interface Props {
  todo: Todo,
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const IscurrentTodo = useAppSelector(state => (
    todo.id === state.currentTodo?.id
  ));

  return (
    <tr
      data-cy="todo"
      className={ClassNames({ 'has-background-info-light': IscurrentTodo })}
    >
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className={todo.completed
          ? 'has-text-success'
          : 'has-text-danger'}
        >
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch(currentTodo.setTodo(todo))}
        >
          <span className="icon">
            <i
              className={ClassNames('far',
                IscurrentTodo
                  ? 'fa-eye-slash'
                  : 'fa-eye')}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
