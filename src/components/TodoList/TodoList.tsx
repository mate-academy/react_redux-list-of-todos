/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);
  const visibleTodos = todos.filter(
    todo =>
      (status === 'all'
        ? true
        : status === 'active'
          ? !todo.completed
          : status === 'completed'
            ? todo.completed
            : false) && todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>

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
            <tr
              data-cy="todo"
              key={todo.id}
              className={
                currentTodo?.id === todo.id ? 'has-background-info-light' : ''
              }
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
                <p className="has-text-danger">{todo.title}</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() =>
                    dispatch(currentTodoSlice.actions.setCurrentTodo(todo))
                  }
                >
                  <span className="icon">
                    <i
                      className={
                        currentTodo?.id === todo.id
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
    </>
  );
};
