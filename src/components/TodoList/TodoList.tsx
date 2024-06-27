import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  return (
    <>
      <table className="table is-narrow is-fullwidth">
        <thead>
          {!!todos.length ? (
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
          ) : (
            <p className="notification is-warning">
              There are no todos matching current filter criteria
            </p>
          )}
        </thead>

        <tbody>
          {todos.map(todo => {
            const { id, title, completed } = todo;

            return (
              <tr
                key={id}
                data-cy="todo"
                className={classNames({
                  'has-background-info-light': id % 2 === 0,
                })}
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
                      'has-text-danger': completed === false,
                      'has-text-success': completed === true,
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
                      dispatch(currentTodoSlice.actions.setTodo(todo));
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye-slash': selectedTodo?.id === id,
                          'fa-eye': selectedTodo?.id !== id,
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
    </>
  );
};
