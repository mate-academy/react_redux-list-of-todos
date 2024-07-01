/* eslint-disable */
import React, { useMemo } from 'react';
import { currentTodoSlice } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import classNames from 'classnames';

enum Status {
  completed = 'completed',
  active = 'active',
}

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const setTodo = (todo: Todo) =>
    dispatch(currentTodoSlice.actions.setTodo(todo));

  const visibleTodos = useMemo(() => {
    let todosProcessed = [...todos];

    switch (status) {
      case Status.completed:
        todosProcessed = todosProcessed.filter(todo => !todo.completed);
        break;
      case Status.active:
        todosProcessed = todosProcessed.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (query) {
      todosProcessed = todosProcessed.filter(todo =>
        todo.title.includes(query),
      );
    }

    return todosProcessed;
  }, [status, query]);

  if (!visibleTodos.length) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
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
            data-cy="todo"
            key={todo.id}
            className={classNames({
              'has-background-info-light': todo.id === currentTodo?.id,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed || (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p
                className={classNames(
                  { 'has-text-danger': todo.completed },
                  { 'has-text-success': !todo.completed },
                )}
              >
                {todo.title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i
                    className={classNames(
                      'far',
                      { 'fa-eye-slash': todo.id === currentTodo?.id },
                      { 'fa-eye': todo.id !== currentTodo?.id },
                    )}
                    onClick={() => setTodo(todo)}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
