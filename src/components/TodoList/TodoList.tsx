/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const visibleTodos = useMemo(() => {
    let tempTodos = todos.filter(todo => {
      switch (status) {
        case Status.ALL:
          return todo;

        case Status.ACTIVE:
          return !todo.completed;

        case Status.COMPLETED:
          return todo.completed;

        default:
          return todo;
      }
    });

    if (query) {
      tempTodos = tempTodos.filter(todo => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      });
    }

    return tempTodos;
  }, [todos, status, query]);

  const changeCurrentTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  if (visibleTodos.length === 0) {
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
            className={todo.id === currentTodo?.id ? 'has-background-info-light' : ''}
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
              <p className={classNames(
                !todo.completed
                  ? 'has-text-danger'
                  : 'has-text-success',
              )}
              >
                {todo.title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => changeCurrentTodo(todo)}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
