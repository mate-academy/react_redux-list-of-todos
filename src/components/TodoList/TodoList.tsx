/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const selectedTodoId = useAppSelector(state => state.currentTodo?.id);
  const isSelectedTodo = (id: number) => selectedTodoId === id;
  const handleSelect = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  const visableTodos = useAppSelector(state => {
    const { todos, filter: filterState } = state;
    const cleanQuery = filterState?.query.trim().toLowerCase() || '';

    return todos.filter(todo => {
      switch (filterState?.status) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return todo;
      }
    }).filter(todo => todo.title.toLowerCase().includes(cleanQuery));
  });

  return (
    <>
      {visableTodos.length <= 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {visableTodos.length > 0 && (
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
            {visableTodos.map(todo => {
              const { id, title, completed } = todo;

              return (
                <tr
                  key={id}
                  data-cy="todo"
                  className={classNames({
                    'has-background-info-light': isSelectedTodo(id),
                  })}
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
                    <p
                      className={classNames({
                        'has-text-danger': !completed,
                        'has-text-success': completed,
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
                      onClick={() => handleSelect(todo)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye': !isSelectedTodo(id),
                            'fa-eye-slash': isSelectedTodo(id),
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
