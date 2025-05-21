import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();
  const chosenTodo = useSelector<RootState, Todo | null>(
    state => state.currentTodo.value,
  );

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
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
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
                className={cn(
                  todo.completed ? 'has-text-success' : 'has-text-danger',
                )}
              >
                {todo.title}
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
                    className={cn('far', {
                      'fa-eye': todo.id !== chosenTodo?.id,
                      'fa-eye-slash': todo.id === chosenTodo?.id,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
