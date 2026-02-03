/* eslint-disable */
import React from 'react';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const selectedTodo = useSelector((state: RootState) => state.currentTodo);
  const filterTodo = useSelector((state: RootState) => state.filter);

  const dispatch = useDispatch();

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title
      .toLowerCase()
      .includes(filterTodo.query.trim().toLowerCase());

    const matchesStatus =
      filterTodo.status === 'all'
        ? true
        : filterTodo.status === 'active'
          ? !todo.completed
          : todo.completed;

    return matchesQuery && matchesStatus;
  });

  return (
    <>
      {visibleTodos.length === 0 ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
        <>
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
                <>
                  <tr
                    data-cy="todo"
                    className={
                      selectedTodo?.id === todo.id
                        ? 'has-background-info-light'
                        : ''
                    }
                  >
                    <td className="is-vcentered">{todo.id}</td>
                    <td className="is-vcentered">
                      {!todo.completed ? (
                        <span className="icon" data-cy="iconCompleted">
                          <i className="fas fa-check" />
                        </span>
                      ) : null}
                    </td>
                    <td className="is-vcentered is-expanded">
                      <p
                        className={
                          todo.completed
                            ? 'has-text-danger'
                            : 'has-text-success'
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
                        onClick={() => dispatch(setCurrentTodo(todo))}
                      >
                        <span className="icon">
                          <i
                            className={
                              selectedTodo?.id !== todo.id
                                ? 'far fa-eye'
                                : 'far fa-eye-slash'
                            }
                          />
                        </span>
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
