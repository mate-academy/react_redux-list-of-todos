import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { StatusValues } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const setTodo = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  let visibleTodos = todos.filter(todo => {
    switch (status) {
      case StatusValues.Active:
        return !todo.completed;

      case StatusValues.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  if (query) {
    visibleTodos = visibleTodos.filter(todo => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });
  }

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
            {visibleTodos.map(todo => {
              const {
                id,
                title,
                completed,
              } = todo;

              return (
                <tr
                  key={id}
                  data-cy="todo"
                  className={classNames(
                    {
                      'has-background-info-light':
                      currentTodo && currentTodo.id === id,
                    },
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
                    <p className={classNames(
                      { 'has-text-danger': !completed },
                      { 'has-text-success': completed },
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
                      onClick={() => setTodo(todo)}
                    >
                      <span className="icon">
                        <i className={
                          currentTodo && currentTodo.id === id
                            ? 'far fa-eye-slash'
                            : 'far fa-eye'
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
      )}
    </>
  );
};
