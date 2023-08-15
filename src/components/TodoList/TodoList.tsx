/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  isLoading: boolean;
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ isLoading, todos }) => {
  const isEmpty = todos.length === 0;
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  return (
    <>
      {isEmpty && !isLoading && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!isEmpty && !isLoading && (
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
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {(todo.completed) && (
                    <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>
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
                    onClick={() => dispatch(currentTodoActions.setTodo(todo))}
                  >
                    <span className="icon">
                      <i
                        className={classNames({
                          'far fa-eye': currentTodo?.id === 0 || currentTodo?.id !== todo.id,
                          'far fa-eye-slash': currentTodo?.id === todo.id,
                        })}
                      />
                    </span>
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
