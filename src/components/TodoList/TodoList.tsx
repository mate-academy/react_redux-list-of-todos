import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getFilteredTodos } from '../../helpers/getFilteredTodos';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const searchParams = useAppSelector(state => state.filter);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, searchParams);
  }, [searchParams]);

  const setTodo = (
    newTodo: Todo,
  ) => dispatch(currentTodoActions.setTodo(newTodo));

  return (
    <>
      {!filteredTodos.length ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )
        : (
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
                const todosClassName = !todo.completed
                  ? 'has-text-danger'
                  : 'has-text-success';

                const handleEyeClick = () => {
                  setTodo(todo);
                };

                return (
                  <tr data-cy="todo" key={todo.id}>
                    <td className="is-vcentered">{todo.id}</td>
                    <td className="is-vcentered">
                      {
                        todo.completed && (
                          <span className="icon" data-cy="iconCompleted">
                            <i className="fas fa-check" />
                          </span>
                        )
                      }

                    </td>

                    <td className="is-vcentered is-expanded">
                      <p className={todosClassName}>{todo.title}</p>
                    </td>

                    <td className="has-text-right is-vcentered">
                      <button
                        data-cy="selectButton"
                        className="button"
                        type="button"
                        onClick={handleEyeClick}
                      >
                        <span className="icon">
                          {currentTodo?.id === todo.id
                            ? (<i className="far fa-eye-slash" />
                            ) : (
                              <i className="far fa-eye" />
                            )}
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
