import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { Todo } from '../../types/Todo';
import { selectTodo } from '../../features/currentTodo';

interface Props {
  todos: Todo[];
  error: string;
}

export const TodoList: React.FC<Props> = ({ todos, error }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedTodo = useSelector(
    (state: RootState) => state.currentTodo.item,
  );

  return (
    <>
      {error && <p className="notification is-warning">{error}</p>}

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
          {todos.map(todo => {
            const { id, title, completed } = todo;
            const isSelected = selectedTodo?.id === id;

            return (
              <tr
                data-cy="todo"
                id={id.toString()}
                className={`todo-container ${isSelected ? 'has-background-info-light' : ''}`}
                key={id}
              >
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
                    className={
                      completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() =>
                      dispatch(selectTodo(isSelected ? null : todo))
                    }
                  >
                    <span className="icon">
                      <i
                        className={`far ${isSelected ? 'fa-eye-slash' : 'fa-eye'}`}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
