/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos: Todo[] = useAppSelector((state) => state.todos);
  const { status, query } = useAppSelector((state) => state.filter);
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const dispatch = useAppDispatch();

  let visibleTodos: Todo[] = [...todos];

  if (status) {
    visibleTodos = visibleTodos.filter((todo) => {
      switch (status) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        case 'all':
        default:
          return visibleTodos;
      }
    });
  }

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    visibleTodos = visibleTodos.filter((todo) => todo.title.toLowerCase().includes(normalizedQuery));
  }

  const handleShowTodo = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <table className="table is-narrow is-fullwidth">
      {visibleTodos.length === 0
        ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        ) : (
          <>
            <thead>
              <tr>
                <th>#</th>

                <th aria-label="togle">
                  <span className="icon">
                    <i className="fas fa-check" />
                  </span>
                </th>

                <th>Title</th>
                <th aria-label="select"> </th>
              </tr>
            </thead>
            <tbody>
              {visibleTodos.map(todo => {
                return (
                  <tr data-cy="todo" key={todo.id}>
                    <td className="is-vcentered">{todo.id}</td>
                    <td className="is-vcentered">
                      {todo.completed
                        && (
                          <span className="icon" data-cy="iconCompleted">
                            <i className="fas fa-check" />
                          </span>
                        )}
                    </td>

                    <td className="is-vcentered is-expanded">
                      <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>{todo.title}</p>
                    </td>

                    <td className="has-text-right is-vcentered">
                      <button
                        data-cy="selectButton"
                        className="button"
                        type="button"
                        aria-label="Select todo"
                        onClick={() => handleShowTodo(todo)}
                      >
                        <span className="icon">
                          <i
                            className={cn('far', {
                              'fa-eye-slash': currentTodo?.id === todo.id,
                              'fa-eye': currentTodo?.id !== todo.id,
                            })}
                          />
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </>
        )}

    </table>
  );
};
