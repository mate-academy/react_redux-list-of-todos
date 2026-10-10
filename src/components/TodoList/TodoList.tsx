/* eslint-disable */
import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodos } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos.items);
  const query = useAppSelector((state) => state.filter.query);
  const status = useAppSelector((state) => state.filter.status);
  const current = useAppSelector((state) => state.current.selectedTodo);
  const dispatch = useAppDispatch();


  const visibleTodos = todos.filter(todo => {
      const matchesStatus =
        status === 'all'
          ? true
          : status === 'completed'
            ? todo.completed
            : !todo.completed;

        const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

          return matchesStatus && matchesQuery;
    });
  return (
    <>
    {visibleTodos.length === 0 ? (
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
      {visibleTodos.map(todo => (
        <tr data-cy="todo" className="" key={todo.id}>
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <i className="fas fa-check" data-cy="iconCompleted" />
            )}
          </td>
          <td className="is-vcentered is-expanded">
            <p
              className={classNames(
                todo.completed ? 'has-text-success' : 'has-text-danger',
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
              onClick={() => dispatch(setCurrentTodos(todo))}
            >
              {todo !== current ? (
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              ) : (
                <span className="icon">
                  <i className="far fa-eye-slash" />
                </span>
              )}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
    )}

    </>
  );
};
