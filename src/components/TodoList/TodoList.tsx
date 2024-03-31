/* eslint-disable */
import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const filteredTodos = todos.filter(todo => {
    switch (status) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  }).filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  const setCurrentTodo = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  return !filteredTodos.length ? (
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
        <th></th>
      </tr>
      </thead>

      <tbody>
      {filteredTodos.map(todo => (
        <tr data-cy="todo">
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
            )}
          </td>

          <td className="is-vcentered is-expanded">
            <p
              className={cn({
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
              })}
            >
              {todo.title}
            </p>
          </td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="selectButton"
              className="button"
              onClick={() => setCurrentTodo(todo)}
            >
              <span className="icon">
                <i
                  className={cn('far', {
                    'fa-eye': todo.id !== currentTodo?.id,
                    'fa-eye-slash': todo.id === currentTodo?.id,
                  })}
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
