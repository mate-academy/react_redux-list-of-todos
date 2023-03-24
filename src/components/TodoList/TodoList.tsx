import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import {
  selectCurrentTodo,
  selectFilter,
  selectTodos,
} from '../../state/todos/selectors';
import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(selectTodos);
  const filter = useAppSelector(selectFilter);
  const currentTodo = useAppSelector(selectCurrentTodo);
  const dispatch = useAppDispatch();

  const selectTodo = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  const visibleTodos = useMemo(() => {
    const lowerCaseQuerey = filter.query.toLocaleLowerCase().trim();

    let queryFiltered = todos.filter(
      todo => todo.title.toLocaleLowerCase().includes(lowerCaseQuerey),
    );

    if (filter.status === FilterType.active) {
      queryFiltered = queryFiltered.filter(todo => !todo.completed);
    } else if (filter.status === FilterType.completed) {
      queryFiltered = queryFiltered.filter(todo => todo.completed);
    }

    return queryFiltered;
  }, [todos, filter]);

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
            key={todo.id}
            data-cy="todo"
            className={classNames(
              {
                'has-background-info-light':
                currentTodo?.id === todo.id,
              },
            )}
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
              <p className={todo.completed
                ? 'has-text-success'
                : 'has-text-danger'}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => selectTodo(todo)}
              >
                <span className="icon">
                  <i className={classNames(
                    'far',
                    { 'fa-eye-slash': currentTodo?.id === todo.id },
                    { 'fa-eye': currentTodo?.id !== todo.id },
                  )}
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
