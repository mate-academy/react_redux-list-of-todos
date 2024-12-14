/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodos } from '../../features/todos';
import { selectFilters } from '../../features/filter';
import { selectCurrTodo, setCurrentTodo } from '../../features/currentTodo';
import { AppDispatch } from '../../app/store';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todosFromServer = useSelector(selectTodos);
  const selectedTodo = useSelector(selectCurrTodo);
  const { query, status } = useSelector(selectFilters);

  const filteredTodos = todosFromServer.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (todo.completed && status === 'completed') ||
      (status === 'active' && !todo.completed);

    return matchesQuery && matchesStatus;
  });

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
            {filteredTodos.map(filTodo => (
              <tr data-cy="todo">
                <td className="is-vcentered">{filTodo.id}</td>
                <td className="is-vcentered">
                  {filTodo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={
                      filTodo.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {filTodo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => dispatch(setCurrentTodo(filTodo))}
                  >
                    <span className="icon">
                      <i
                        className={
                          filTodo.id === selectedTodo?.id
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
  );
};
