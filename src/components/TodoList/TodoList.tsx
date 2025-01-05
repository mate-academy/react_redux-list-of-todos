/* eslint-disable */
import React, { useEffect } from 'react';
import { fetchTodos } from '../../features/todos';
import { currentTodoSlice } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  filteredTodos: Todo[];
};
export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.todos.loading);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleClick = (todo: Todo) => {
    dispatch(currentTodoSlice.actions.currentTodo(todo));
  };
  return (
    <>
      {!filteredTodos.length && !isLoading ? (
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
            {filteredTodos.map(todo => (
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
                    className={cn({
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
                    })}
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    onClick={() => handleClick(todo)}
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye-slash': currentTodo,
                          'fa-eye': !currentTodo,
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
