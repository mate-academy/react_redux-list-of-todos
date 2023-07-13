/* eslint-disable max-len */
import React from 'react';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as selectedTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = { todos: Todo[] };

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

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
          const isTodoSelected = currentTodo?.id === id;

          return (
            <tr
              data-cy="todo"
              className={classnames({
                'has-background-info-light': isTodoSelected,
              })}
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
                <p className={classnames({
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
                  onClick={() => dispatch(selectedTodoActions.setTodo(todo))}
                >
                  <span className="icon">
                    <i className={classnames(
                      'far',
                      {
                        'fa-eye': !isTodoSelected,
                        'fa-eye-slash': isTodoSelected,
                      },
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
  );
};
