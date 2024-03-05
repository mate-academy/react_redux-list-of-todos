/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as selectedActions } from '../../features/currentTodo';

type Props = { todos: Todo[]; isLoading: boolean };

export const TodoList: React.FC<Props> = ({ todos, isLoading }) => {
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  return (
    <>
      {todos.length === 0 && !isLoading && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th aria-label="th">
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th aria-label="th"> </th>
          </tr>
        </thead>

        <tbody>
          {todos.map(todo => (
            <tr
              data-cy="todo"
              key={todo.id}
              className={classNames({
                'has-background-info-light': todo.id === selectedTodo?.id,
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
                  className={classNames({
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
                  })}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  aria-label="button"
                  type="button"
                  onClick={() => dispatch(selectedActions.setTodo(todo))}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye': todo.id !== selectedTodo?.id,
                        'fa-eye-slash': todo.id === selectedTodo?.id,
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
