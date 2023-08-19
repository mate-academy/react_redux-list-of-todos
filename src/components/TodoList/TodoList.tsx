/* eslint-disable max-len */
import React, { useEffect, useMemo } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTodos } from '../../api';
import { actions as actionsTodo } from '../../features/todos';
import { Todo } from '../../types/Todo';
import { FilterStatus } from '../../types/FilterStatus';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos: Todo[] = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const todosLoader = () => {
    getTodos()
      .then((result) => dispatch(actionsTodo.setTodo(result)));
  };

  useEffect(() => {
    todosLoader();
  }, []);

  const filteredTodos = useMemo(() => todos.filter(todo => {
    const { title } = todo;
    const normalizedQuery = query.toLocaleLowerCase();
    const normalizedTitle = title.toLocaleLowerCase().includes(normalizedQuery);

    switch (status) {
      case FilterStatus.ACTIVE:
        return !todo.completed && normalizedTitle;

      case FilterStatus.COMPLETED:
        return todo.completed && normalizedTitle;

      default:
        return todo && normalizedTitle;
    }
  }), [todos, status, query]);

  const isDataLoaded = todos.length > 0;
  const noSearchResults = isDataLoaded && !filteredTodos.length;

  return (
    <>
      {noSearchResults && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!noSearchResults && isDataLoaded && (
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

              const isSelectedTodo = id === currentTodo?.id;

              return (
                <tr
                  data-cy="todo"
                  className={cn(
                    { 'has-background-info-light': isSelectedTodo },
                  )}
                  key={id}
                >
                  <td className="is-vcentered">
                    {id}
                  </td>
                  <td className="is-vcentered">
                    {completed
                      && (
                        <span className="icon" data-cy="iconCompleted">
                          <i className="fas fa-check" />
                        </span>
                      )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p className={cn(
                      {
                        'has-text-success': completed,
                        'has-text-danger': !completed,
                      },
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
                      onClick={() => dispatch(actionsCurrentTodo.setTodo(todo))}
                    >
                      <span className="icon">
                        <i className={cn(
                          'far',
                          { 'fa-eye': !isSelectedTodo },
                          { 'fa-eye-slash': isSelectedTodo },
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
      )}
    </>
  );
};
