/* eslint-disable max-len */
import React, { useMemo } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoFeat } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);

  const isSelected = (id: number) => currentTodo?.id === id;

  const visibleTodos = useMemo(() => {
    switch (filter.status) {
      case Status.Active:
        return todos.filter((todo: Todo) => !todo.completed);
      case Status.Completed:
        return todos.filter((todo: Todo) => todo.completed);
      default:
        return todos;
    }
  }, [filter.status, todos]);

  return (
    <>
      {filter.query && !visibleTodos.length && (
        <p className="notification is-warning">
          There are no todos matching the current filter criteria
        </p>
      )}
      <table className="table is-narrow is-fullwidth">
        { !!visibleTodos.length && (
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
        )}

        <tbody>
          {visibleTodos.map((todo: Todo) => {
            const { title, completed, id } = todo;

            return (
              <tr key={id} data-cy="todo">
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p className={completed ? 'has-text-success' : 'has-text-danger'}>
                    {title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => dispatch(currentTodoFeat.setTodo(todo))}
                  >
                    <span className="icon">
                      <i className={cn('far', { 'fa-eye-slash': isSelected(id), 'fa-eye': !isSelected(id) })} />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
