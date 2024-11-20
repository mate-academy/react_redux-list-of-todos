/* eslint-disable */
import React from 'react';

import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();

  const { currentTodo } = useAppSelector(state => state.currentTodo);

  const addCurrentTodo = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };

  return (
    <>
      {!todos.length ? (
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
            {todos.map(todo => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={
                  currentTodo?.id === todo.id ? 'has-background-info-light' : ''
                }
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
                    onClick={() => addCurrentTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': currentTodo?.id !== todo.id,
                          'fa-eye-slash': currentTodo?.id === todo.id,
                        })}
                      />{' '}
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
