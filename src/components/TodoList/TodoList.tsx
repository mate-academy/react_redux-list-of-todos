/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { RootState } from '../../app/store';
import { currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.data);
  const filter = useSelector((state: RootState) => state.filter);
  const loading = useSelector((state: RootState) => state.todos.loading);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  const filteredTodos = useMemo(
    () => todos
      .filter((todo) => {
        switch (filter.status) {
          case 'active':
            return !todo.completed;

          case 'completed':
            return todo.completed;

          default:
            return true;
        }
      })
      .filter((todo) => {
        const preparedQuery = filter.query.toLowerCase();

        return todo.title.toLocaleLowerCase().includes(preparedQuery);
      }),
    [filter.query, filter.status, todos],
  );

  return (
    <>
      {!filteredTodos.length && !loading ? (
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
                {todo.completed ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                ) : (
                  <td className="is-vcentered"> </td>
                )}

                <td className="is-vcentered is-expanded">
                  <p
                    className={cn({
                      'has-text-success': todo.completed,
                      'has-text-danger': !todo.completed,
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
                    onClick={() => {
                      const selectedTodo = todos.find(
                        (el) => el.id === todo.id,
                      );

                      if (selectedTodo) {
                        dispatch(currentTodoActions.setTodo(selectedTodo));
                      }
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye': todo.id !== currentTodo?.id,
                          'fa-eye-slash': todo.id === currentTodo?.id,
                        })}
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
