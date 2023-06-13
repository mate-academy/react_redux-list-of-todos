/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsCurrTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const setCurrentTodo = (todo: Todo) => {
    dispatch(actionsCurrTodo.setTodo(todo));
  };

  if (todos.length === 0) {
    return <h2>No todos found</h2>;
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
        {todos.map((todo) => {
          const { id, title, completed } = todo;

          return (
            <tr
              data-cy="todo"
              key={id}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={classNames({
                    'has-text-danger': !completed,
                    'has-text-success': completed,
                  })}
                >
                  {title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setCurrentTodo(todo)}
                >
                  <span className="icon">
                    <i className={classNames('far', {
                      'fa-eye': todo !== currentTodo,
                      'fa-eye-slash': todo === currentTodo,
                    })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
