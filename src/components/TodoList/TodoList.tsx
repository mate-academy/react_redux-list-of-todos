/* eslint-disable */
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => {
        if (status === 'all') {
          return todo;
        }

        return todo.completed === (status === 'completed');
      })
      .filter(todo => {
        if (!query) {
          return todo;
        }

        return todo.title.toLowerCase().includes(query.toLowerCase());
      });
  }, [todos, status, query]);

  return (
    <>
      {filteredTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {filteredTodos.length > 0 && (
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
            <React.Fragment key={todo.id}>
              <tr data-cy="todo" className={classNames({'has-background-info-light': currentTodo?.id === todo.id})}>
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
                    onClick={() => dispatch(currentTodoSlice.actions.setCurrentTodo(todo))}
                  >
                    <span className="icon">
                      {currentTodo?.id !== todo.id && <i className="far fa-eye" />}
                      {currentTodo?.id === todo.id && <i className="far fa-eye-slash" />}
                    </span>
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      )}
    </>
  );
};
