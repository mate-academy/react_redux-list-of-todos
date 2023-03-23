import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { FilterType } from '../../types/FilterType';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const getVisibleTodos = () => {
    let statusFiltered;
    const lowerCaseQuerey = filter.query.toLocaleLowerCase().trim();

    switch (filter.status) {
      case FilterType.active:
        statusFiltered = todos.filter(todo => !todo.completed);
        break;

      case FilterType.completed:
        statusFiltered = todos.filter(todo => todo.completed);
        break;

      default:
        statusFiltered = todos;
    }

    return statusFiltered.filter(
      todo => todo.title.toLocaleLowerCase().includes(lowerCaseQuerey),
    );
  };

  const visibleTodos = getVisibleTodos();

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
                onClick={() => dispatch(currentTodoActions.setTodo(todo))}
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
