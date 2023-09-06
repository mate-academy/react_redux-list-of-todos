/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { todoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const { query, status } = useAppSelector(state => state.filter);

  const setTodo = (todo: Todo) => dispatch(todoActions.setTodo(todo));

  useEffect(() => {
    const queryNormalized = query.trim().toLowerCase();
    const filteredTodosByStatus = todos.filter(todo => {
      switch (status) {
        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        case Status.All:
        default:
          return true;
      }
    });

    const filteredTodosByQuery = filteredTodosByStatus.filter(todo => todo.title
      .toLowerCase()
      .includes(queryNormalized));

    setVisibleTodos(filteredTodosByQuery);
  }, [todos, query, status]);

  const isTodosNotFound = visibleTodos.length === 0;

  return (
    <>
      {isTodosNotFound && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!isTodosNotFound && (
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
              <tr data-cy="todo" key={todo.title}>
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
                    className={classNames(todo.completed ? 'has-text-success' : 'has-text-danger')}
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => setTodo(todo)}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
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
