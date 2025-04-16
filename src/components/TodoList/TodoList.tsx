/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { RootState } from '../../app/store';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { getTodos } from '../../api';
import { todosSlice } from '../../features/todos';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state: RootState) => state.todos);
  const currTodo = useAppSelector((state: RootState) => state.currentTodo);
  const query = useAppSelector((state: RootState) => state.filter.query);
  const status = useAppSelector((state: RootState) => state.filter.status);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        dispatch(todosSlice.actions.setTodos(todosFromServer));
      })
      .catch(e => {
        throw new Error(e);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);
    return matchesQuery && matchesStatus;
  });

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && filtered.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {filtered.map(todo => {
            return (
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
                    className={classNames({
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
                    })}
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() =>
                      dispatch(currentTodoSlice.actions.toggleTodo(todo))
                    }
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': currTodo?.id !== todo.id,
                          'fa-eye-slash': currTodo?.id === todo.id,
                        })}
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
