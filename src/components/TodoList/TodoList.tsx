/* eslint-disable max-len */
import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { filterTodos } from '../../functions/filterTodos';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const currentStatus = useAppSelector(state => state.filter.status);
  const currentQuery = useAppSelector(state => state.filter.query);

  const handleOpenModal = (chosenTodo: Todo) => {
    dispatch(currentTodoActions.setTodo(chosenTodo));
  };

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, currentStatus, currentQuery);
  }, [todos, currentStatus, currentQuery]);

  return (
    <>
      {!filteredTodos.length && currentQuery && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {filteredTodos.map(todo => {
            const { id, title, completed } = todo;

            return (
              <tr
                key={id}
                data-cy="todo"
              >
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span
                      className="icon"
                      data-cy="iconCompleted"
                    >
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
                      'has-text-success': completed,
                      'has-text-danger': !completed,
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
                    onClick={() => handleOpenModal(todo)}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': currentTodo !== todo,
                          'fa-eye-slash': currentTodo === todo,
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
