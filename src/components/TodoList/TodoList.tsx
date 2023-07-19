/* eslint-disable max-len */
import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { actions as actionsActive } from '../../features/activeTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const activeTodo = useAppSelector(state => state.activeTodo);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  const addActiveTodo = (todo: Todo) => {
    dispatch(actionsActive.addTodo(todo));
  };

  return (
    <>
      {!filter && (
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
          {filter?.map(todo => (
            <tr data-cy="todo" key={todo.id}>
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
                  className={classNames(
                    { 'has-text-danger': !todo.completed },
                    { 'has-text-success': todo.completed },
                  )}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  onClick={() => addActiveTodo(todo)}
                  data-cy="selectButton"
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    <i className={classNames(
                      'far',
                      { 'fa-eye': todo !== activeTodo },
                      { 'fa-eye-slash': todo === activeTodo },
                    )}
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
