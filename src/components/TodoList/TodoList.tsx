/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { useAppDispatch } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todos: Todo[],
  selectedTodoId: number,
  setIsModalShowed: (param: boolean) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  setIsModalShowed,
}) => {
  const dispatch = useAppDispatch();

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
        {todos.map(todo => {
          const { id, title, completed } = todo;

          return (
            <tr
              key={id}
              data-cy="todo"
              className={classNames({
                'has-background-info-light': selectedTodoId === id,
              })}
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
                  onClick={() => {
                    dispatch(currentTodoActions.setTodo(todo));
                    setIsModalShowed(true);
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames(
                        'far',
                        {
                          'fa-eye': selectedTodoId !== id,
                          'fa-eye-slash': selectedTodoId === id,
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
