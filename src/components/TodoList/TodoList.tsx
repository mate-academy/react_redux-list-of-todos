/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import classNames from 'classnames';
import { currentTodoSlice } from '../../features/currentTodo';
import { filterTodos } from '../../features/filter';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, loading } = useAppSelector(state => state.todos);
  const { currentTodo } = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const preparedTodos = filterTodos(status, query, todos);


  return (
    <>
      {!loading && preparedTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!loading && preparedTodos.length !== 0 && (
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
            {preparedTodos.map(todo => (
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
                    onClick={() => dispatch(currentTodoSlice.actions.setCurrentTodo(todo))}
                  > 
                    <span className="icon">
                      <i
                        className={classNames({
                          'fas fa-eye': currentTodo?.id !== todo.id,
                          'far fa-eye-slash': currentTodo?.id === todo.id,
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
