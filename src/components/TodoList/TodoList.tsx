/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { actions as todoActions } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({
  todos,
}) => {
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

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
          {todos.map(todo => {
            const { id, completed, title } = todo;
            const isTodoSelected = selectedTodo?.id === id;

            return (
              <tr
                data-cy="todo"
                className={classNames({
                  'has-background-info-light': isTodoSelected,
                })}
                key={id}
              >
                <td className="is-vcentered">
                  {id}
                </td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p className={classNames({
                    'has-text-success': completed,
                    'has-text-danger': !completed,
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
                    onClick={() => dispatch(todoActions.setTodo(todo))}
                  >
                    <span className="icon">
                      <i className={classNames(
                        'far',
                        {
                          'fa-eye-slash': isTodoSelected,
                          'fa-eye': !isTodoSelected,
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
    </>
  );
};
