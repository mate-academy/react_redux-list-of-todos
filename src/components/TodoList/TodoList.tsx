/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const todos = useAppSelector((state) => state.todos);
  const { query, status } = useAppSelector((state) => state.filter);

  const setCurrentTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const filteredTodos = (
    todosForFilter: Todo[],
    queryForFilter: string,
    statusForFilter: Status,
  ) => {
    const filteredByQuery = todosForFilter.filter((todo: Todo) => {
      return todo.title.toLowerCase().includes(queryForFilter.toLowerCase());
    });

    switch (statusForFilter) {
      case 'active':
        return filteredByQuery.filter((todo) => !todo.completed);
      case 'completed':
        return filteredByQuery.filter((todo) => todo.completed);

      default:
        return filteredByQuery;
    }
  };

  const visibleTodos = filteredTodos(todos, query, status);
  const isVisible = !visibleTodos.length;

  return (
    <>
      {isVisible ? (
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
            {visibleTodos.map((todo) => {
              const { completed, id, title } = todo;

              return (
                <tr
                  key={id}
                  data-cy="todo"
                >
                  <td className="is-vcentered">{id}</td>

                  <td className="is-vcentered">
                    {completed && (
                      <span
                        className="icon"
                        data-cy="iconCompleted"
                      >
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p
                      className={
                        completed ? 'has-text-success' : 'has-text-danger'
                      }
                    >
                      {title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => {
                        setCurrentTodo(todo);
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            id === currentTodo?.id
                              ? ' far fa-eye-slash'
                              : ' far fa-eye',
                          )}
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
