import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(status => status.todos);
  const filter = useAppSelector((status) => status.filter);
  const currentTodo = useAppSelector(status => status.currentTodo);
  const { query, status } = filter;
  const dispatch = useAppDispatch();

  const handleSelect = (todo: Todo | null) => {
    if (todo) {
      dispatch(currentTodoActions.setTodo(todo));
    }
  };

  const filteredTodos: Todo[] = useMemo(() => {
    let preparedTodos = [...todos];

    if (status) {
      preparedTodos = preparedTodos.filter((todo) => {
        switch (status) {
          case Filter.ALL:
            return todo;

          case Filter.ACTIVE:
            return !todo.completed;

          case Filter.COMPLETED:
            return todo.completed;

          default:
            return todo;
        }
      });
    }

    if (query.trim()) {
      preparedTodos = preparedTodos.filter((todo) => todo.title.toLowerCase()
        .includes(query.toLowerCase()));
    }

    return preparedTodos;
  }, [todos, filter, query]);

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
        {filteredTodos.map(todo => {
          const { id, title, completed } = todo;

          return (
            <tr data-cy="todo" className="" key={id}>
              <td className="is-vcentered">{id}</td>
              {completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}

              <td className="is-vcentered is-expanded">
                <p
                  className={classNames(
                    { 'has-text-success': completed },
                    { 'has-text-danger': !completed },
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
                  onClick={() => handleSelect(todo)}
                >
                  <span className="icon">
                    <i className={classNames(
                      'far',
                      { 'fa-eye': currentTodo !== todo },
                      { 'fa-eye-slash': currentTodo === todo },
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
  );
};
