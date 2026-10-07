/* eslint-disable */
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos.todos);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { selectTodo } = currentTodoSlice.actions;
  const dispatch = useAppDispatch();

  const updatedTodos = useMemo(
    () =>
      [...todos]
        .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
        .filter(todo => {
          if (status === 'active') {
            return todo.completed === false;
          }

          if (status === 'completed') {
            return todo.completed;
          }

          return todo;
        }),
    [todos, query, status],
  );

  return (
    <>
      {updatedTodos.length === 0 ? (
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
            {updatedTodos.map(todo => {
              return (
                <tr key={todo.id} data-cy="todo">
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
                      onClick={() => dispatch(selectTodo(todo))}
                    >
                      <span className="icon">
                        {selectedTodo?.id === todo.id ? (
                          <i className="far fa-eye-slash" />
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
