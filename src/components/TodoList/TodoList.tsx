import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const currentTodo: Todo | null = useAppSelector(state => state.currentTodo);
  const filteredTodos: Todo[] = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const handlerClickChooseTodo = (todo: Todo) => {
    dispatch(actionsCurrentTodo.setTodo(todo));
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
            {filteredTodos.map(todo => {
              const { id, title, completed } = todo;

              return (
                <tr data-cy="todo" key={id}>
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p className={classNames(
                      { 'has-text-success': completed },
                      { 'has-text-danger': !completed },
                    )}
                    >
                      {title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => handlerClickChooseTodo(todo)}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'far',
                          { 'fa-eye': currentTodo?.id !== id },
                          { 'fa-eye-slash': currentTodo?.id === id },
                        )}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
