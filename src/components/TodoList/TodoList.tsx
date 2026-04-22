/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { currentTodoSlice } from '../../features/currentTodo';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(store => store.todos);
  const currTodo = useAppSelector(store => store.currentTodo);
  const { query, status } = useAppSelector(store => store.filter);

  const dispatch = useAppDispatch();

  const visibleTodos = todos
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    .filter(todo => {
      switch (status) {
        case 'all':
          return true;
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
      }
    });

  return (
    <>
      {visibleTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {visibleTodos.length !== 0 && (
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
              <tr data-cy="todo">
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
                    onClick={() =>
                      dispatch(currentTodoSlice.actions.setTodo(todo))
                    }
                    className="button"
                    type="button"
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
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
