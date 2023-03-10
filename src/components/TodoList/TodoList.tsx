/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = (
    currentTodos: Todo[],
    newQuery: string,
    newStatus: Status,
  ) => {
    return currentTodos.filter((todo) => {
      const normalizeTodosWithQuery
        = todo.title.toLowerCase().includes(newQuery.toLowerCase());

      switch (newStatus) {
        case Status.active:
          return !todo.completed && normalizeTodosWithQuery;
        case Status.completed:
          return todo.completed && normalizeTodosWithQuery;
        default:
          return normalizeTodosWithQuery;
      }
    });
  };

  const todosForList = filteredTodos(todos, query, status);

  return (
    <>
      {!todosForList.length
        ? (
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
              {todosForList.map(todo => {
                const { id, title, completed } = todo;
                const todoSelect = id === currentTodo?.id;

                return (
                  <tr
                    key={id}
                    data-cy="todo"
                    className={classNames(
                      { 'has-background-info-light': todoSelect },
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
                        onClick={() => dispatch(currentTodoActions.setTodo(todo))}
                      >
                        <span className="icon">
                          <i className={classNames('far', {
                            'fa-eye': !todoSelect,
                            'fa-eye-slash': todoSelect,
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
