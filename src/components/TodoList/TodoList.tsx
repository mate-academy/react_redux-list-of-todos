/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import clsx from 'clsx';

interface Props {
  todos: Todo[];
  currentTodo: Todo | null;
  openModalCard: (value: Todo) => void;
  isLoading: boolean;
}

export const TodoList: React.FC<Props> = ({
  todos,
  currentTodo,
  openModalCard,
  isLoading
}) => (
  <>
    {!todos.length && !isLoading && (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    )}

    {todos.length > 0 && (
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
              className={clsx({
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
                  className={clsx({
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
                  onClick={() => openModalCard(todo)}
                >
                  <span className="icon">
                    <i
                      className={clsx('far', {
                        'fa-eye': !currentTodo || currentTodo.id !== todo.id,
                        'fa-eye-slash': currentTodo?.id === todo.id,
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
