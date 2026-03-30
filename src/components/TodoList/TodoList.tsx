/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/all_Types';
import classNames from 'classnames';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const visibleTodos = todos.filter((todo: Todo) => {
    if (status === 'active') {
      return !todo.completed;
    }

    if (status === 'completed') {
      return todo.completed;
    }

    return true;
  })
  .filter((todo: Todo) => (
    todo.title.toLowerCase().includes(query.toLowerCase())
  ));

  return (
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
        {visibleTodos.length <= 0 && (
          <tr>
            <td colSpan={4}>
              <p className="notification is-warning">
                There are no todos matching current filter criteria
              </p>
            </td>
          </tr>
        )}

        {visibleTodos.map(todo => {

          return (
            <tr
              data-cy="todo"
              className={classNames({ 'has-background-info-light': todo.id === currentTodo?.id })}
              key={todo.id}
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
                <p className={todo.completed ? 'has-text-success' : "has-text-danger"}>{todo.title}</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button"
                  onClick={() =>
                    currentTodo?.id === todo.id
                      ? dispatch(currentTodoSlice.actions.clearCurrentTodo())
                      : dispatch(
                          currentTodoSlice.actions.setCurrentTodo(todo),
                        )
                    }
                >
                  <span className="icon">
                    <i className={`far ${currentTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`} />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
