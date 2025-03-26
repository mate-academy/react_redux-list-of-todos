import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { selectFilteredTodos } from '../../features/selectors';
import { useDispatch } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';

interface Props {
  selectedItem: Todo | null;
}

export const TodoList: React.FC<Props> = ({ selectedItem }) => {
  const dispatch = useDispatch();
  const todos = useAppSelector(selectFilteredTodos);

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames('', {
              'has-background-info-light': selectedItem?.id === todo.id,
            })}
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
              <p
                className={classNames('', {
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span
                  className="icon"
                  onClick={() => dispatch(setCurrentTodo(todo))}
                >
                  <i
                    className={classNames('', {
                      'far fa-eye': selectedItem?.id !== todo.id,
                      'far fa-eye-slash': selectedItem?.id === todo.id,
                    })}
                  />{' '}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
