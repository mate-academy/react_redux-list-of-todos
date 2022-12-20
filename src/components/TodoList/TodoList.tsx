/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { todos } = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const [isNotFilteredTodos, setIsNotFilteredTodos] = useState(false);

  const setTodo = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  const lowerQuery = query.toLowerCase();

  const visibleTodos = todos.filter(todo => {
    switch (status) {
      case 'active':
        return !todo.completed && todo.title.toLowerCase().includes(lowerQuery);

      case 'completed':
        return todo.completed && todo.title.toLowerCase().includes(lowerQuery);

      case 'all':
      default:
        return todo && todo.title.toLowerCase().includes(lowerQuery);
    }
  });

  useEffect(() => {
    if (!visibleTodos.length) {
      setIsNotFilteredTodos(true);
    } else {
      setIsNotFilteredTodos(false);
    }
  }, [visibleTodos.length]);

  return (
    <>
      {isNotFilteredTodos ? (
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
            {visibleTodos.map(todo => {
              const { id, title, completed } = todo;

              return (
                <tr
                  key={id}
                  data-cy="todo"
                  className={classNames(
                    { 'has-background-info-light': id === currentTodo?.id },
                  )}
                >
                  <td className="is-vcentered">{id}</td>

                  <td className="is-vcentered">
                    {completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p className={classNames({
                      'has-text-success': completed,
                      'has-text-danger': !completed,
                    })}
                    >
                      {title}
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
                        <i className={classNames('far',
                          (id === currentTodo?.id)
                            ? 'fa-eye-slash'
                            : 'fa-eye')}
                        />
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
