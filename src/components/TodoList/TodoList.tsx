import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const handleTodoSelection = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos;

    switch (status) {
      case Status.Active:
        filteredTodos = filteredTodos.filter(({ completed }) => !completed);
        break;

      case Status.Completed:
        filteredTodos = filteredTodos.filter(({ completed }) => completed);
        break;

      default:
        break;
    }

    if (query) {
      const normalizedQuery = query.toLowerCase();

      filteredTodos = filteredTodos.filter(({ title }) => {
        const normalizedTitle = title.toLowerCase();

        return normalizedTitle.includes(normalizedQuery);
      });
    }

    return filteredTodos;
  }, [status, query]);

  return (
    <>
      {!visibleTodos.length && (
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
          {visibleTodos.map((todo) => {
            const { id, title, completed } = todo;
            const isCurrentTodo = currentTodo?.id === id;

            return (
              <tr
                data-cy="todo"
                key={id}
                className={
                  classNames({ 'has-background-info-light': isCurrentTodo })
                }
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
                    className={classNames(
                      completed ? 'has-text-success' : 'has-text-danger',
                    )}
                  >
                    {title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleTodoSelection(todo)}
                  >
                    <span className="icon">
                      <i
                        className={
                          classNames(
                            'far',
                            isCurrentTodo ? 'fa-eye-slash' : 'fa-eye',
                          )
                        }
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
