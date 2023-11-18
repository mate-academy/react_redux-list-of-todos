/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { FilterStatusValues } from '../../types/FilterStatusValues';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const setCurrentTodo = (todo: Todo) => dispatch(actions.setTodo(todo));

  const filterdTodos = useMemo(() => {
    const preparedQuery = query.trim().toLowerCase();

    return todos.filter(todo => {
      if (!todo.title.trim().toLowerCase().includes(preparedQuery)) {
        return false;
      }

      switch (status) {
        case FilterStatusValues.All:
        default:
          return true;

        case FilterStatusValues.Active:
          return !todo.completed;

        case FilterStatusValues.Completed:
          return !!todo.completed;
      }
    });
  }, [todos, query, status]);

  return (
    <>
      {!!todos.length && !filterdTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!!filterdTodos.length && (
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
            {filterdTodos.map(todo => (
              <tr
                data-cy="todo"
                className={classNames({
                  'has-background-info-light': todo === currentTodo,
                })}
                key={todo.id}
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
                  <p className={
                    todo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
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
                      <i className={classNames('far',
                        {
                          'fa-eye': currentTodo !== todo,
                        },
                        {
                          'fa-eye-slash': currentTodo
                            && todo.id === currentTodo.id,
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
