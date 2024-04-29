/* eslint-disable */
import React, { useEffect, useState, useCallback } from 'react';
import { getTodos } from '../../api';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as actionsTodo } from '../../features/todos';
import { actions as actionsSetTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(response => {
        dispatch(actionsTodo.addTodos(response));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const todos = useAppSelector(state => state.todos);

  const currentTodo = useAppSelector(state => state.currentTodo);

  const query = useAppSelector(state => state.filter.query);

  const status = useAppSelector(state => state.filter.status);

  const filterTodos = useCallback(
    (initialTodos: Todo[]) => {
      let filteredTodos = [...initialTodos];

      if (query.trim().length) {
        filteredTodos = filteredTodos.filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()),
        );
      }

      if (status === 'completed') {
        filteredTodos = filteredTodos.filter(todo => todo.completed);
      }

      if (status === 'active') {
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
      }

      return filteredTodos;
    },
    [query, status],
  );

  const preparedTodos = filterTodos(todos);

  return (
    <>
      {!preparedTodos.length && !isLoading && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        {!!preparedTodos.length && (
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
        )}
        <tbody>
          {preparedTodos.map(todo => (
            <tr
              key={todo.id}
              data-cy="todo"
              className={classNames({
                'has-background-info-light': todo.id === currentTodo?.id,
              })}
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
                  onClick={() => dispatch(actionsSetTodo.setTodo(todo))}
                >
                  {currentTodo?.id === todo.id ? (
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  ) : (
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
