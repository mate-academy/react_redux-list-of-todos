import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

type Props = {
  loadingTodos: boolean;
};

export const TodoList: React.FC<Props> = ({ loadingTodos }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const todosFilter = todos
    .filter(todo =>
      todo.title.toLowerCase().includes(filter.query.toLowerCase()),
    )
    .filter(todo => {
      if (filter.status === 'active') {
        return !todo.completed;
      }

      if (filter.status === 'completed') {
        return todo.completed;
      }

      return true;
    });

  return (
    <>
      {!loadingTodos && (
        <>
          {!todosFilter.length ? (
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
                {todosFilter.map(todo => (
                  <tr data-cy="todo" className="" key={todo.id}>
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
                        className={
                          todo.completed
                            ? 'has-text-success'
                            : 'has-text-danger'
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
                        onClick={() => dispatch(actions.setTodo(todo))}
                      >
                        <span className="icon">
                          <i
                            className={
                              todo.id === currentTodo?.id
                                ? 'far fa-eye-slash'
                                : 'far fa-eye'
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
      )}
    </>
  );
};
