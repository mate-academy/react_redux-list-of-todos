/* eslint-disable jsx-a11y/control-has-associated-label */
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { todoActions } from '../../features/currentTodo';
import { modalActions } from '../../features/modalReducer';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);
  const isModalShow = useAppSelector(state => state.modalStatus);
  const filteredTodos = todos.filter(todo => {
    const normalizeTodoTitle = todo.title.toLowerCase();
    const normalizeFilterQuery = filter.query.toLowerCase();

    if (!normalizeTodoTitle.includes(normalizeFilterQuery)) {
      return false;
    }

    if (filter.status === 'all') {
      return todo;
    }

    if (todo.completed && filter.status === 'completed') {
      return todo;
    }

    if (!todo.completed && filter.status === 'active') {
      return todo;
    }

    return false;
  });

  const todoHandler = (arg: Todo) => {
    dispatch(modalActions.show());
    dispatch(todoActions.setTodo(arg));
  };

  return (
    <>
      {!filteredTodos.length ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
            {filteredTodos.map((todo) => (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed ? (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  ) : (
                    ''
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => todoHandler(todo)}
                  >
                    <span className="icon">
                      <i
                        className={
                          isModalShow ? 'fas fa-eye-slash' : 'far fa-eye'
                        }
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
