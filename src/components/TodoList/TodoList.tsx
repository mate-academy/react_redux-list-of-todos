/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';

import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.todos);

  const { query, status: filter } = useAppSelector(state => state.filter);

  const currentTodo = useAppSelector(state => state.currentTodo);
  const selectedTodoId = currentTodo?.id;

  const onShow = (todo: any) => dispatch(setCurrentTodo(todo));
  const onHide = () => dispatch(setCurrentTodo(null));

  const filtered = todos
    .filter(todo =>
      filter === 'all'
        ? true
        : filter === 'completed'
          ? todo.completed
          : !todo.completed,
    )
    .filter(t => t.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
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
          {filtered.map(todo => (
            <tr
              key={todo.id}
              data-cy="todo"
              className={classNames({
                'has-background-info-light': !todo.completed,
              })}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={classNames({
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
                  onClick={() =>
                    selectedTodoId === todo.id ? onHide() : onShow(todo)
                  }
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye-slash': selectedTodoId === todo.id,
                        'fa-eye': selectedTodoId !== todo.id,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
