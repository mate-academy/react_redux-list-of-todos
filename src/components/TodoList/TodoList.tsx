/* eslint-disable */
import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import type { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectTodo = useAppSelector(state => state.currentTodo);
  const currentFilter = useAppSelector(state => state.filter);

  const filterTodos = (todo: Todo) => {
    const validQuery = currentFilter.query.toLowerCase().trim();
    const matchesQuery = todo.title.toLowerCase().trim().includes(validQuery);

    switch (currentFilter.status) {
      case 'active':
        return !todo.completed && matchesQuery;
      case 'completed':
        return todo.completed && matchesQuery;
      default:
        return matchesQuery;
    }
  };

  const filteredTodos = todos.filter(filterTodos);

  return (
    <>
      {!filteredTodos.length ? (
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
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredTodos.map(todo => {
              const { id, title, completed } = todo;

              return (
                <tr data-cy="todo" key={id}>
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {completed ? (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    ) : (
                      ''
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p
                      className={classNames({
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
                      onClick={() => dispatch(currentTodoActions.setTodo(todo))}
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye': !selectTodo,
                            'fa-eye-slash': selectTodo,
                          })}
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
