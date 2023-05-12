import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todos: Todo[],
  selectUser(userId: number): void,
  hasLoadingError: boolean,
  onAgain(): void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
  hasLoadingError,
  onAgain,
}) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const setTodo = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  if (hasLoadingError) {
    return (
      <button
        type="button"
        onClick={() => onAgain()}
      >
        Try again
      </button>
    );
  }

  if (todos.length === 0) {
    return (
      <p>No todos....</p>
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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': currentTodo?.id === todo.id,
            })}
            key={todo.id}
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
                type="button"
                onClick={() => {
                  selectUser(todo.userId);
                  setTodo(todo);
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'far',
                    {
                      'fa-eye': currentTodo?.id !== todo.id,
                      'fa-eye-slash': currentTodo?.id === todo.id,
                    },
                  )}
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
