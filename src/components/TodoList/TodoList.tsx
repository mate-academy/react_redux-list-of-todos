/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector((state) => state.currentTodo);

  return (
    <>
      {todos.length ? (
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
              const isSelectedTodo = currentTodo?.id === todo.id;

              return (
                <tr
                  data-cy="todo"
                  className={classNames({
                    'has-background-info-light': isSelectedTodo,
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
                        'has-text-success': todo.completed,
                        'has-text-danger': !todo.completed,
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
                      onClick={() => dispatch(setTodo(todo))}
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye': !isSelectedTodo,
                            'fa-eye-slash': isSelectedTodo,
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
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
