/* eslint-disable */
import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);

  const preparedTodos = todos.filter(todo => {
    if (
      filter.query &&
      !todo.title.toLowerCase().includes(filter.query.toLowerCase())
    ) {
      return false;
    }

    switch (filter.status) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });

  const setCurrentTodo = (todo: Todo) =>
    dispatch(currentTodoActions.setTodo(todo));

  return (
    <>
      {!preparedTodos.length ? (
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
            {preparedTodos.map(todo => {
              const isCurrentTodo = currentTodo?.id === todo.id;

              return (
                <tr
                  data-cy="todo"
                  className={classNames({
                    'has-background-info-light': isCurrentTodo,
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
                      className={classNames({
                        'has-text-success': todo.completed,
                        'has-text-danger': !todo.completed,
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
                      onClick={() => setCurrentTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye': !isCurrentTodo,
                            'fa-eye-slash': isCurrentTodo,
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
