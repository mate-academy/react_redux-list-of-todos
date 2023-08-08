/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const { todos } = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = todos.filter((todo) => {
    const lowerQueery = query.toLowerCase();
    const lowerTitle = todo.title.toLowerCase();
    const todoStatus = status === 'all' ? true : todo.completed === (status === 'completed');

    return lowerTitle.includes(lowerQueery) && todoStatus;
  });

  const handleSelectTodo = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  const notFound = filteredTodos.length === 0;

  return (
    <>
      {notFound
        ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )
        : (
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
              {filteredTodos.map((todo) => {
                const { id, title, completed } = todo;

                return (
                  <tr data-cy="todo" key={id}>
                    <td className="is-vcentered">{id}</td>
                    <td className="is-vcentered">
                      {completed && (
                        <span className="icon" data-cy="iconCompleted">
                          <i className="fas fa-check" />
                        </span>
                      )}
                    </td>

                    <td className="is-vcentered is-expanded">
                      <p className={classNames(
                        'has-text-danger',
                        { 'has-text-success': completed },
                      )}
                      >
                        {title}
                      </p>
                    </td>

                    <td className="has-text-right is-vcentered">
                      <button
                        data-cy="selectButton"
                        className="button"
                        type="button"
                        onClick={() => handleSelectTodo(todo)}
                      >
                        <span className="icon">
                          <i className={classNames('far', 'fa-eye', { 'fa-eye-slash': id === currentTodo?.id })} />
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
    </>
  );
};
