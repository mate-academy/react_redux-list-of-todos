import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchTodos } from '../../features/todos';
import { findCurrentTodo } from '../../features/currentTodo';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const query = useSelector((state: RootState) => state.filter.query);
  const status = useSelector((state: RootState) => state.filter.status);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const filteredTodos = todos.filter(todo => {
    const queryMatch = todo.title.toLowerCase().includes(query.toLowerCase());
    const statusMatch =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    return queryMatch && statusMatch;
  });

  return (
    <>
      {filteredTodos.length ? (
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
            {filteredTodos.map(todo => (
              <tr
                key={todo.id}
                data-cy="todo"
                className={classNames({
                  'has-background-info-light': currentTodo?.id === todo.id,
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
                    onClick={() => dispatch(findCurrentTodo(todo.id))}
                  >
                    <span className="icon">
                      {currentTodo?.id === todo.id ? (
                        <i className="far fa-eye-slash" />
                      ) : (
                        <i className="far fa-eye" />
                      )}
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
