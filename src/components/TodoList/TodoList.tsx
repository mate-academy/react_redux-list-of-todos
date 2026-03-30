/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import cx from 'classnames';
import { setSelectedTodo } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            key={todo.id}
            className={cx({
              'is-selected': todo.id === selectedTodo?.id,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td>
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}
            <td className="is-vcentered is-expanded">
              {!todo.completed ? (
                <p className="has-text-danger">{todo.title}</p>
              ) : (
                <p className="has-text-success">{todo.title}</p>
              )}
            </td>
            <td className="has-text-right is-vcentered">
              {todo.id === selectedTodo?.id ? (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => dispatch(setSelectedTodo(null))}
                >
                  <span className="icon" data-cy="iconCompleted">
                    <i className="far fa-eye-slash" />
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => dispatch(setSelectedTodo(todo))}
                  className="button"
                  data-cy="selectButton"
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
