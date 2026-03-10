/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';
import cn from 'classnames';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = todos
    .filter(todo => {
      if (status === 'active') return !todo.completed;
      if (status === 'completed') return todo.completed;
      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  if (filteredTodos.length === 0) {
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
        {filteredTodos.map(todo => (
          <tr
            data-cy="todo"
            key={todo.id}
            className={cn({
              'has-background-info-light': currentTodo?.id === todo.id,
            })}
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
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => dispatch(setCurrentTodo(todo))}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye-slash': currentTodo?.id === todo.id,
                      'fa-eye': currentTodo?.id !== todo.id,
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
