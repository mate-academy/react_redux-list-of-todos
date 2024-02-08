/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  let visibleTodos: Todo[] = [...todos];

  if (status) {
    visibleTodos = visibleTodos.filter((todo) => {
      switch (status) {
        case Status.completed:
          return todo.completed;

        case Status.active:
          return !todo.completed;

        case Status.all:
        default:
          return visibleTodos;
      }
    });
  }

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    visibleTodos = visibleTodos
      .filter((todo) => todo.title.toLowerCase()
        .includes(normalizedQuery));
  }

  const handleTodoShow = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  return (
    <>
      {!visibleTodos.length ? (
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
            {visibleTodos.map(todo => (
              <tr
                key={todo.id}
                data-cy="todo"
                className={cn({
                  'has-background-info-light': currentTodo?.id === todo.id,
                })}
              >

                <td className="is-vcentered">
                  {todo.id}
                </td>

                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p className={cn({
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
                  })}
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleTodoShow(todo)}
                  >
                    <span className="icon">
                      <i className={cn('far', {
                        'fa-eye': currentTodo?.id !== todo.id,
                        'fa-eye-slash': currentTodo?.id === todo.id,
                      })}
                      />
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
