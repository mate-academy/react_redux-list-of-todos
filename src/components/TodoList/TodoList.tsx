/* eslint-disable max-len */
import cn from 'classnames';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

type Props = {
  isLoading: boolean
};

export const TodoList: React.FC<Props> = ({ isLoading }) => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos;

    const filterItems = (completed: boolean) => {
      return filteredTodos.filter(todo => todo.completed === completed);
    };

    switch (status) {
      case Status.ALL:
        filteredTodos = todos;
        break;

      case Status.ACTIVE:
        filteredTodos = filterItems(false);
        break;

      case Status.COMPLETED:
        filteredTodos = filterItems(true);
        break;

      default:
        break;
    }

    if (query) {
      filteredTodos = filteredTodos.filter(todo => {
        const lowerQuery = query.trim().toLowerCase();

        return todo.title.toLocaleLowerCase().includes(lowerQuery);
      });
    }

    return filteredTodos;
  }, [status, query, todos]);

  return (
    <>
      {!isLoading && !visibleTodos.length
        && (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )}
      {visibleTodos.length > 0 && (
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
              const { title, id, completed } = todo;

              return (
                <tr data-cy="todo" key={id}>
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
                      className={cn({
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
                          className={cn({
                            'far fa-eye-slash': currentTodo?.id === id,
                            'far fa-eye': currentTodo?.id !== id,
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
