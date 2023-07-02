import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | undefined,
  selectedTodo: Todo | null,
};

export const TodoTable: React.FC<Props> = ({ todos, selectedTodo }) => {
  const dispatch = useDispatch();

  return (
    <tbody>
      {todos && todos.map(todo => {
        return (
          <tr key={todo.id} data-cy="todo">
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}
            <td className="is-vcentered is-expanded">
              <p className={cn({
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
              })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              {selectedTodo && todo.id === selectedTodo.id ? (
                <button
                  data-cy="selectButton"
                  className="button is-link"
                  type="button"
                  onClick={() => {
                    dispatch(actions.removeTodo());
                  }}
                >
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                </button>
              ) : (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    dispatch(actions.setTodo(todo));
                  }}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
