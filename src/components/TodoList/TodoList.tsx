import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filters = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch<AppDispatch>();

  const visibleTodos = todos.filter(todo => {
    const textTodos = todo.title
      .toLowerCase()
      .includes(filters.query.toLowerCase());

    return (
      (filters.status === 'all' ||
        (filters.status === 'completed' && todo.completed === true) ||
        (filters.status === 'active' && todo.completed === false)) &&
      textTodos
    );
  });

  return (
    <>
      {visibleTodos.length === 0 ? (
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
            {visibleTodos.map(todo => (
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
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  {currentTodo === null || currentTodo.id !== todo.id ? (
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(setCurrentTodo(todo))}
                    >
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    </button>
                  ) : (
                    <button
                      data-cy="hideButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(setCurrentTodo(null))}
                    >
                      <span className="icon">
                        <i className="fas fa-eye-slash" />
                      </span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
