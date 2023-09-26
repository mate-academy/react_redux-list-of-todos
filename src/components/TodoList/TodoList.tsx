/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { SetTodoAction } from '../../features/currentTodo';

type Props = {
  visibleTodos: Todo[] | undefined;
  showSelectedUser: (todo: Todo) => SetTodoAction;
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  showSelectedUser,
  selectedTodo,
}) => {
  return (
    <>
      {visibleTodos?.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {visibleTodos !== undefined && visibleTodos?.length > 0 && (
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
            {visibleTodos.map(todo => (
              <tr key={todo.id} data-cy="todo" className={classNames({ 'has-background-info-light': selectedTodo?.id === todo.id })}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">{todo.completed && <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>}</td>
                <td className="is-vcentered is-expanded">
                  <p className={classNames({
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
                    onClick={() => showSelectedUser(todo)}
                  >
                    <span className="icon">
                      <i className={classNames({
                        'far fa-eye-slash': selectedTodo?.id === todo.id,
                        'far fa-eye': selectedTodo === null || selectedTodo.id !== todo.id,
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
