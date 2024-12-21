/* eslint-disable */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { currentTodoSlice } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(store => store.currentTodo);
  const dispatch = useAppDispatch();

  const handleCurrentTodo = (todo: Todo) => {
    if (todo.id !== currentTodo?.id) {
      dispatch(currentTodoSlice.actions.get(todo));
    } else {
      dispatch(currentTodoSlice.actions.clear());
    }
  };

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'active' ? !todo.completed : todo.completed);
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  return (
    <>
      {filteredTodos.length === 0 && (
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
          {filteredTodos.map(todo => (
            <tr
              key={todo.id}
              data-cy="todo"
              className={
                todo.id === currentTodo?.id ? 'has-background-info-light' : ''
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
                  onClick={() => handleCurrentTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye-slash': todo.id === currentTodo?.id,
                        'fa-eye': todo.id !== currentTodo?.id,
                      })}
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
