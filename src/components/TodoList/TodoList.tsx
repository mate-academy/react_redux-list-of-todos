/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';

enum TodoStatusFilter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const getVisibleTodos = (
  todos: Todo[],
  status: Status,
  query: string,
) => {
  let preparedTodos = [...todos];

  if (query) {
    const lowerQuery = query.toLowerCase();

    preparedTodos = preparedTodos
      .filter(todo => todo.title.toLowerCase().includes(lowerQuery));
  }

  preparedTodos = preparedTodos.filter(todo => {
    switch (status) {
      case TodoStatusFilter.All:
        return true;
      case TodoStatusFilter.Active:
        return !todo.completed;
      case TodoStatusFilter.Completed:
        return todo.completed;
      default:
        throw new Error('Filter type is incorrect');
    }
  });

  return preparedTodos;
};

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, status, query),
    [todos, query, status],
  );

  const todosElements = visibleTodos.map(todo => {
    const { id, title, completed } = todo;
    const isCurrent = currentTodo?.id === todo.id;

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
          <p className={!completed ? 'has-text-danger' : 'has-text-success'}>
            {title}
          </p>
        </td>

        <td className="has-text-right is-vcentered">
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={() => dispatch(actions.setTodo(todo))}
          >
            <span className="icon">
              <i className={`far ${!isCurrent ? 'fa-eye' : 'fa-eye-slash'}`} />
            </span>
          </button>
        </td>
      </tr>
    );
  });

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
            {todosElements}
          </tbody>
        </table>
      )}

    </>
  );
};
