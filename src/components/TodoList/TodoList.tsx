/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { currentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const current = useSelector((state: RootState) => state.currentTodo);
  const currentStatus = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  function filterTodos() {
    switch (currentStatus.status) {
      case 'all': {
        return currentStatus.query
          ? todos.filter(todo => todo.title.toLowerCase().includes(currentStatus.query.toLowerCase()))
          : todos;
      }
      case 'active': {
        return currentStatus.query
          ? todos.filter(
              todo =>
                !todo.completed && todo.title.toLowerCase().includes(currentStatus.query.toLowerCase()),
            )
          : todos.filter(todo => !todo.completed);
      }
      case 'completed': {
        return currentStatus.query
          ? todos.filter(
              todo =>
                todo.completed && todo.title.toLowerCase().includes(currentStatus.query.toLowerCase()),
            )
          : todos.filter(todo => todo.completed);
      }
      default:
        return todos;
    }
  }

  const currentTodos = filterTodos();

  return (
    <>
      {currentTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {currentTodos.length > 0 && (
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
            {currentTodos.map(todo => (
              <tr key={todo.id} data-cy="todo">
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
                    onClick={() => {
                      if (todo !== null) {
                        dispatch(currentTodo(todo));
                      }
                    }}
                  >
                    <span className="icon">
                      <i
                        className={`far ${current?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
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
